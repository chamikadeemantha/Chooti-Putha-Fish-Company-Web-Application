import FishBuyer from "../model/fishbuyerModel.js";

//create

export const createbuyer =async(req,res)=>{
    try{

        const fishbuyerData = new FishBuyer(req.body);

        if(!fishbuyerData){
            return res.status(404).json({msg: "Fish Buyer data not found"});
        }

        const savedData = await fishbuyerData.save();
        res.status(200).json(savedData);

    }catch(error){

        res.status(500).json({error:error});
    }
}

//fletching data

export const getAllbuyers = async(req,res) =>{

    try{

        const fishbuyerData = await FishBuyer.find();
        if(!fishbuyerData){
            return res.status(404).json({msg: "Fish Buyer All data not found"});
        }
        res.status(200).json(fishbuyerData);

    }catch(error){

        res.status(500).json({error:error});
    }
}

//getone

export const getonebuyer =async(req,res) => {

    try{

        const id =req.params.id;
        const fishbuyerExist = await FishBuyer.findById(id);

        if(!fishbuyerExist){
            return res.status(404).json({msg: "Fish Buyer not found"});
        }
        res.status(200).json(fishbuyerExist);
    }catch(error){

        res.status(500).json({error:error});
    } 
}

//update
export const updatebuyer =async(req,res) =>{

    try{

        const id =req.params.id;
        const fishbuyerExist = await FishBuyer.findById(id);

        if(!fishbuyerExist){
            return res.status(404).json({msg: "Fish Buyer not found/cant' update"});
        }

        //updating

        const updatedData =await  FishBuyer.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedData);

    }catch(error){

        res.status(500).json({error:error});
    } 
}


//delete

export const deletebuyer =async(req,res) =>{

    try{

        const id =req.params.id;
        const fishbuyerExist = await FishBuyer.findById(id);

        if(!fishbuyerExist){
            return res.status(404).json({msg: "Fish Buyer not found/can't delete"});
        }

        await  FishBuyer.findByIdAndDelete(id);
        res.status(200).json({msg: "Fish Buyer Details deleted successfully"});

    }catch(error){

        res.status(500).json({error:error});
    } 
}

