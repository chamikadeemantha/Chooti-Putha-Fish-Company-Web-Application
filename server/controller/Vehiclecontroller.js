import User from "../model/VehicleModel.js"

export const createvehicle = async(req, res) => {
    try {

        const userData = new User(req.body);

        if (!userData){
            return res.status(404),json({msg: "User data not found!!!"})
        }

        const savedData = await userData.save();
        // res.status(200).json(savedData);
        res.status(200).json({msg: "User Added successfully"});
    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const getAllvehicle = async(req, res) => {
    try {

        const userData = await User.find();

        if (!userData){
            return res.status(404),json({msg: "Users data not found!!!"});
        }
        res.status(200).json(userData);

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const getOnevehicle = async(req, res) => {
    try {

        const id  = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist){
            return res.status(404),json({msg: "User not found!!!"});
        }
        res.status(200).json(userExist);

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const updatevehicle = async(req, res) => {
    try {

        const id  = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
            return res.status(404),json({msg: "User not found!!!"});
        }
        
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({msg: "User updated successfully"});

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const deleteUservehicle = async(req, res) => {
    try {

        const id  = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
            return res.status(404),json({msg: "User not found!!!"});
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}


