import mongoose from "mongoose";


const fishermenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true
    // },
    address: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    trip: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    deletedAt: { 
        type: Date, 
        default: null 
    }
})

export default mongoose.model("Fishermen", fishermenSchema);


