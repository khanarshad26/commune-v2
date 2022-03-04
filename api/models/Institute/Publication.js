import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      max: 100,
      unique: true,
    },
    authers: [
      {
        name: {
          type: String,
          max: 100,
        },
        profession: {
          type: String,
          max: 100,
        },
        organization: {
          type: String,
          max: 100,
        },
      },
    ],
    publisher: {
      type: String,
      max: 100,
    },
    workReference: {
      type: String,
      max: 100,
    },
    details: {
      type: String,
      max: 1000,
    },
    file: {
      type: String,
      max: 100,
    },
    date: {
      type: Date,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Publication", PublicationSchema);
