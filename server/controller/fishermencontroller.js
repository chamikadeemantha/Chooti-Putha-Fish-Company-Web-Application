import Fishermen from "../model/fishermenModel.js"

export const createFishermen = async(req, res) => {
    try {

        const fishermenData = new Fishermen(req.body);

        if (!fishermenData){
            return res.status(404),json({msg: "Fishermen data not found!!!"})
        }

        await fishermenData.save();
        // res.status(200).json(savedData);
        res.status(200).json({msg: "Fishermen Added successfully"});
    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const getAllFishermen = async(req, res) => {
    try {

        const fishermenData = await Fishermen.find();

        if (!fishermenData){
            return res.status(404),json({msg: "Fishermens data not found!!!"});
        }
        res.status(200).json(fishermenData);

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const getOneFishermen = async(req, res) => {
    try {

        const id  = req.params.id;
        const fishermenExist = await Fishermen.findById(id);

        if (!fishermenExist){
            return res.status(404),json({msg: "Fishermen not found!!!"});
        }
        res.status(200).json(fishermenExist);

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const updateFishermen = async(req, res) => {
    try {

        const id  = req.params.id;
        const fishermenExist = await Fishermen.findById(id);
        if (!fishermenExist){
            return res.status(404),json({msg: "Fishermen not found!!!"});
        }
        
        const updatedData = await Fishermen.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({msg: "Fishermen updated successfully"});

    }
    catch (error) {
        res.status(500).json({error: error})
    }
}

export const deleteFishermen = async (req, res) => {
    try {
        const id = req.params.id;
        const fishermenExist = await Fishermen.findById(id);
        
        if (!fishermenExist) {
            return res.status(404).json({ msg: "Fishermen not found!!!" });
        }

        // Mark fishermen as deleted by setting deletedAt timestamp
        await Fishermen.findByIdAndUpdate(id, { deletedAt: new Date() });

        res.status(200).json({ msg: "Fishermen marked as deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDeletedFishermen = async (req, res) => {
    try {
        // Assuming Fishermen schema has a field called "deletedAt" to mark deletion date
        const deletedFishermen = await Fishermen.find({ deletedAt: { $ne: null } });
        res.status(200).json(deletedFishermen);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllActiveFishermen = async (req, res) => {
    try {
        // Fetch all fishermen profiles where deletedAt is null
        const activeFishermen = await Fishermen.find({ deletedAt: null });
        res.status(200).json(activeFishermen);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
