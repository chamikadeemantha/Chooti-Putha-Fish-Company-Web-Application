import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: [
      "owner",
      "coordinator",
      "tansportmanager",
      "inventorymanager",
      "writtingperson",
      "hrmanager",
    ],
  },
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
