import express from "express";

import { createbuyer, deletebuyer, getAllbuyers, getonebuyer, updatebuyer} from "../controller/fishbuyerController.js";


const route = express.Router();

route.post("/createbuyer",createbuyer);
route.get("/getAllbuyers",getAllbuyers);
route.get("/getonebuyer/:id",getonebuyer);
route.put("/updatebuyer/:id",updatebuyer);
route.delete("/deletebuyer/:id", deletebuyer);


export default route;