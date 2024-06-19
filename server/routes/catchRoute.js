import express from "express";
import { createcatch, deletecatch, getallcatch, getonecatch, updatecatch } from "../controller/catchController.js";

const route = express.Router();

route.post("/createcatch",createcatch);
route.get("/getallcatch",getallcatch);
route.get("/getonecatch/:id",getonecatch);
route.put("/updatecatch/:id",updatecatch);
route.delete("/deletecatch/:id",deletecatch);



export default route;