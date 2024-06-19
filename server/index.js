//server setup

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import fishroute from "./routes/fishpriceRoute.js";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js";
import Catchroute from "./routes/catchRoute.js";
import fishermenroute from "./routes/fishermenRoute.js";
import employeeroute from "./routes/employeeRoute.js";
import boattriproute from "./routes/boatTripRoute.js";
import vehicleroute from "./routes/VehicleRoute.js";
import equipmentroute from "./routes/equipmentRoute.js";
import buyerroute from "./routes/fishbuyerRoute.js";


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use(morgan("dev"));

app.use("/api/fish", fishroute);
app.use("/api/user", userRouter);
app.use("/api/employee", employeeroute);
app.use("/api/boattrip",boattriproute);
app.use("/api/catch",Catchroute);
app.use("/api/fishermen", fishermenroute)
app.use("/api/vehicle", vehicleroute)
app.use("/api/equipment",equipmentroute);
app.use("/api/buyer",buyerroute);


const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected successfully");

    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
