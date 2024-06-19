import Catch from "../model/catchModel.js"

export const createcatch = async(req,res)=>{

    try {
        const catchData = new Catch(req.body);

        if(!catchData){
            return res.status(404).json({msg: "Catch data not found"})
        }

        const savedData =await catchData.save();
        res.status(200).json({msg:"Catch Added successfully"});

    } catch (error) {
       res.status(500).json({error: error}) ;
    }
}

export const getallcatch = async(req,res)=>{
    try {
        const catchData = await Catch.find();
        if(!catchData){
            return res.status(404).json({msg:"Catch data not found"});
        }
        res.status(200).json(catchData);
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const getonecatch = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const catchExist = await Catch.findById(id);

        if(!catchExist){
            return res.status(404).json({msg:"User not found"});
        }

        res.status(200).json(catchExist);
    } catch (error) {
        res.status(500).json({error:error});
        
    }
}

export const updatecatch = async(req,res)=>{
    try {
        
        const id = req.params.id;
        const catchExist = await Catch.findById(id);
        if(!catchExist){
        return res.status(401).json({msg:"Catch not found"});
        }

        const updatedData = await Catch.findByIdAndUpdate(id, req.body,{new:true})
        res.status(200).json({msg:"Catch Updated successfully"});
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const deletecatch = async(req,res)=>{
    try {
        const id = req.params.id;
        const catchExist = await Catch.findById(id);
        if(!catchExist){
            return res.status(404).json({msg:"Catch not exist"})
        }
        await Catch.findByIdAndDelete(id);
        res.status(200).json({msg:"Catch log deleted successfully"})
    } catch (error) {
        res.status(500).json({error:error});
    }
}