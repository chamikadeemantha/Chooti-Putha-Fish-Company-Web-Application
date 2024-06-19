import express from "express";
import { createfish,getAllfish,getonefish,updatefish,deletefishprice } from "../controller/fishpriceController.js";


const route = express.Router();

route.post("/createfish",createfish);
route.get("/getallfish",getAllfish);
route.get("/getonefish/:id",getonefish);
route.put("/updatefish/:id",updatefish);
route.delete("/deletefish/:id", deletefishprice);

export default route;