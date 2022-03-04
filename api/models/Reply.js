import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    reply: {
      type: String,
      max: 1000,
    },
    time: {
      type: String,
      max: 200,
    },
    replier: {
      type: String,
      max: 200,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Reply", ReplySchema);
