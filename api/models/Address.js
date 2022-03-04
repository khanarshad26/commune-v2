import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    line1: {
      type: String,
      max: 100,
    },
    line2: {
      type: String,
      max: 100,
    },
    city: {
      type: String,
      max: 50,
    },
    district: {
      type: String,
      max: 50,
    },
    state: {
      type: String,
      max: 50,
    },
    country: {
      type: String,
      max: 50,
    },
    pin: {
      type: Number,
      max: 6,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address", AddressSchema);
