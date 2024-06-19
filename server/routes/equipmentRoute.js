import express from "express";
import { addEquipment, deleteEquipment, getAllEquipment, getoneEquipment, updateEquipment,  } from "../controller/equipmentController.js";


const route = express.Router();

route.post("/addequipment", addEquipment);
route.get("/getallequipment",getAllEquipment);
route.get("/getoneequipment/:id",getoneEquipment);
route.put("/updateequipment/:id",updateEquipment);
route.delete("/deleteequipment/:id", deleteEquipment);

export default route;