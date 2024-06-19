import BoatTrip from "../model/boatTripModel.js";


export const createboattrip = async (req, res) => {
    try {
        const boatTripData = new BoatTrip(req.body);

        if (!boatTripData) {
            return res.status(404).json({ msg: "Boat Trip data not found" });
        }

        const savedData = await boatTripData.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getboattrip = async (req, res) => {
    try {
        const boatTripData = await BoatTrip.find();
        if (!boatTripData || boatTripData.length === 0) {
            return res.status(404).json({ msg: "Boat Trip data not found" });
        }
        res.status(200).json(boatTripData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getoneboattrip = async (req, res) => {
    try {
        const id = req.params.id;
        const boatTripData = await BoatTrip.findById(id);
        
        if (!boatTripData) {
            return res.status(404).json({ msg: "Boat Trip not found" });
        }
        
        res.status(200).json(boatTripData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateboattrip = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
     
        const existingTrip = await BoatTrip.findById(id);
        if (!existingTrip) {
            return res.status(404).json({ msg: "Boat Trip not found" });
        }
        
        const updatedTrip = await BoatTrip.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteboattrip = async (req, res) => {
    try {
        const id = req.params.id;
     
        const existingTrip = await BoatTrip.findByIdAndDelete(id);
        if (!existingTrip) {
            return res.status(404).json({ msg: "Boat Trip not found" });
        }

        res.status(200).json({ msg: "Boat Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
