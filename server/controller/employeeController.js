import employeedetail from "../model/employeeModel.js";

//create

export const createemployee = async (req, res) => {
    try {

        const employeeData = new employeedetail(req.body);

        if (!employeeData) {
            return res.status(404).json({ msg: "Employee details data not found" });
        }

        const savedData = await employeeData.save();
        res.status(200).json(savedData);

    } catch (error) {

        res.status(500).json({ error: error });
    }
}

//fletching data

export const getAllemployee = async (req, res) => {

    try {

        const employeeData = await employeedetail.find();
        if (!employeeData) {
            return res.status(404).json({ msg: "Employee details All data not found" });
        }
        res.status(200).json(employeeData);

    } catch (error) {

        res.status(500).json({ error: error });
    }
}

//getone

export const getoneemployee = async (req, res) => {

    try {

        const id = req.params.id;
        const employeeExist = await employeedetail.findById(id);

        if (!employeeExist) {
            return res.status(404).json({ msg: "Employee details not found" });
        }
        res.status(200).json(employeeExist);
    } catch (error) {

        res.status(500).json({ error: error });
    }
}

//update
export const updateemployee = async (req, res) => {

    try {

        const id = req.params.id;
        const employeeExist = await employeedetail.findById(id);

        if (!employeeExist) {
            return res.status(404).json({ msg: "Employee details not found/cant' update" });
        }

        //updating

        const updatedData = await employeedetail.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedData);

    } catch (error) {

        res.status(500).json({ error: error });
    }
}


//delete

export const deleteemployee = async (req, res) => {

    try {

        const id = req.params.id;
        const employeeExist = await employeedetail.findById(id);

        if (!employeeExist) {
            return res.status(404).json({ msg: "Employee details not found/can't delete" });
        }

        await employeedetail.findByIdAndDelete(id);
        res.status(200).json({ msg: "Employee Details deleted successfully" });

    } catch (error) {

        res.status(500).json({ error: error });
    }
}