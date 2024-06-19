import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    number_plate: {
        type: String,
        required: true
    },
    driver_phone_no: {
        type: String,
        required: true
    },
    fuel_type: {
        type: String,
        required: true
    },
    tank_capacity: {
        type: String,
        required: true
    },
    last_location: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    
})

export default mongoose.model("Vehicles", userSchema);