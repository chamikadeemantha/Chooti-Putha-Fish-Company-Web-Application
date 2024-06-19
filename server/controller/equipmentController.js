import Equipment from "../model/equipmentModel.js";

//create

export const addEquipment =async(req,res)=>{
    try{

        const equipmentData = new Equipment(req.body);

        if(!equipmentData){
            return res.status(404).json({msg: "Equipment data not found"});
        }

        const savedData = await equipmentData.save();
        res.status(200).json(savedData);

    }catch(error){

        res.status(500).json({error:error});
    }
}

//fletching data

export const getAllEquipment = async(req,res) =>{

    try{

        const equipmentData = await Equipment.find();
        if(!equipmentData){
            return res.status(404).json({msg: "Equipment All data not found"});
        }
        res.status(200).json(equipmentData);

    }catch(error){

        res.status(500).json({error:error});
    }
}

//getone

export const getoneEquipment =async(req,res) => {

    try{

        const id =req.params.id;
        const equipmentExist = await Equipment.findById(id);

        if(!equipmentExist){
            return res.status(404).json({msg: "Equipment not found"});
        }
        res.status(200).json(equipmentExist);
    }catch(error){

        res.status(500).json({error:error});
    } 
}

//update
export const updateEquipment =async(req,res) =>{

    try{

        const id =req.params.id;
        const equipmentExist = await Equipment.findById(id);

        if(!equipmentExist){
            return res.status(404).json({msg: "Equipment not found/cant' update"});
        }

        //updating

        const updatedData =await  Equipment.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedData);

    }catch(error){

        res.status(500).json({error:error});
    } 
}


//delete

export const deleteEquipment =async(req,res) =>{

    try{

        const id =req.params.id;
        const equipmentExist = await Equipment.findById(id);

        if(!equipmentExist){
            return res.status(404).json({msg: "Equipment not found/can't delete"});
        }

        await  Equipment.findByIdAndDelete(id);
        res.status(200).json({msg: "Equipment Details deleted successfully"});

    }catch(error){

        res.status(500).json({error:error});
    } 
}