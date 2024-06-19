import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

const createUser = async (req, res) => {
  try {
    const { name, position, empId, email, password } = req.body;

    const existinfUser = await User.findOne({ email });

    if (existinfUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      position,
      empId,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userResponse = {
      name: newUser.name,
      position: newUser.position,
      empId: newUser.empId,
      email: newUser.email,
    };

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error During user Registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const userResponse = {
      name: existingUser.name,
      position: existingUser.position,
      empId: existingUser.empId,
      email: existingUser.email,
      id: existingUser._id,
    };

    res.status(200).json({ user: userResponse, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error During user Login" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    console.log(id);
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Old Password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: "Password Changed Successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error During password change" });
  }
};

export { createUser, loginUser, changePassword };
