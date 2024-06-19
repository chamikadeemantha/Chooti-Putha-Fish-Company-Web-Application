import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    position: {
        type: String,
        required: true

    },
    department: {
        type: String,
        required: true

    },
    NIC: {
        type: String,
        required: true

    },
    experience: {
        type: String,
        required: true

    },
    salary: {
        type: String,
        required: true

    },
    availability: {
        type: String,
        required: true

    }
})

export default mongoose.model("employeedetail", employeeSchema);