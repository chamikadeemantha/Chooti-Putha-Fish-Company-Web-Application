import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fishType:{
        type:String,
        required: true
    },
    grade:{
        type:String,
        required: true
    },
    method_of_catch:{
        type:String,
        required: true
    },
    caught_quantity:{
        type:String,
        required: true
    },
    released_quantity:{
        type:String,
        required: true
    },
    available_stock:{
        type:String,
        required: true
    }
    // availability:{
    //     type:String,
    //     required: true
    // }
})

export default mongoose.model("Catch", userSchema)