import mongoose from "mongoose";

const { Schema } = mongoose;

const boattripSchema = new Schema({
  tripID: {
    type: Number,
    required: true,
  },
  boatName: {
    type: String,
    required: true
  },
  tripType: {
    type: String,
    required: true
  },
  noOfEmployees: {
    type: Number,
    required: true
  },
  fishingCaught: {
    type: Number,
    required: true
  },
  costAvg: {
    type: Number,
    required: true
  },
  profitAvg: {
    type: Number,
    required: true
  }
});

const BoatTrip = mongoose.model('BoatTrip', boattripSchema);

export default BoatTrip;
