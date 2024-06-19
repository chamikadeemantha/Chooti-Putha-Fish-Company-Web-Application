import mongoose from "mongoose";

const fishbuyerSchema =new mongoose.Schema({

    name:{
        type:String,
        required:true

    },
    contact_number:{
        type:String,
        required:true

    },
    last_payment_option:{
        type:String,
        required:true
 
    
    },

    last_payment:{
        type:String,
        required:true

    },

    last_buy_quantity:{

        type:String,
        required:true
    },
    total_payment:{
        type:String,
        required:true

    },
    

    arrear:{
        type:String,
        required:true

    },
  
    last_purchase_date:{
        type:String,
        required:true

    }
})

export default mongoose.model("FishBuyer",fishbuyerSchema);