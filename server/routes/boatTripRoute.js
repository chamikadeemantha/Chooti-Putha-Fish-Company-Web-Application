import express from "express";
import { createboattrip, getboattrip, getoneboattrip, updateboattrip, deleteboattrip } from "../controller/boatTripController.js";

const route = express.Router();

route.post("/createboattrip", createboattrip);
route.get("/getboattrip", getboattrip);
route.get("/getoneboattrip/:id", getoneboattrip);
route.put("/updateboattrip/:id", updateboattrip);
route.delete("/deleteboattrip/:id", deleteboattrip);

export default route;
