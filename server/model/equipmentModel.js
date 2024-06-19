import mongoose from "mongoose";

const equipmentSchema =new mongoose.Schema({

    name:{
        type:String,
        required:true

    },
    quantity:{
        type:String,
        required:true
        
    },
    relaseamount:{
        type:String,
        required:true

    },
    condition:{
        type:String,
        required:true

    },
    availability:{
        type:String,
        required:true

    },
})

export default mongoose.model("equipment",equipmentSchema);