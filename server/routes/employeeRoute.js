import express from "express";
import { createemployee, getAllemployee, getoneemployee, updateemployee, deleteemployee } from "../controller/employeeController.js";


const route = express.Router();

route.post("/createemployee", createemployee);
route.get("/getallemployee", getAllemployee);
route.get("/getoneemployee/:id", getoneemployee);
route.put("/updateemployee/:id", updateemployee);
route.delete("/deleteemployee/:id", deleteemployee);

export default route;