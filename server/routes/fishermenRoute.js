import express, { Router } from "express";
import { createFishermen, deleteFishermen, getAllFishermen, getOneFishermen, updateFishermen, getDeletedFishermen, getAllActiveFishermen } from "../controller/fishermencontroller.js";

const route = express.Router();

route.post("/createFishermen", createFishermen);
route.get("/getAllFishermen", getAllFishermen);
route.get("/getOneFishermen/:id", getOneFishermen);
route.put("/updateFishermen/:id", updateFishermen);
route.delete("/deleteFishermen/:id", deleteFishermen);
route.get("/getDeletedFishermen", getDeletedFishermen);
route.get("/getAllActiveFishermen", getAllActiveFishermen);



export default route;