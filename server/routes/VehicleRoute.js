import express from "express";
import { createvehicle, deleteUservehicle, getAllvehicle, getOnevehicle, updatevehicle } from "../controller/Vehiclecontroller.js";

const route = express.Router();

route.post("/createvehicle", createvehicle);
route.get("/getallvehicle", getAllvehicle);
route.get("/getonevehicle/:id", getOnevehicle);
route.put("/updatevehicle/:id", updatevehicle);
route.delete("/deletevehicle/:id", deleteUservehicle)

export default route;