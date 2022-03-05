import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    reply: {
      type: String,
      max: 1000,
    },
    time: {
      type: Date,
      max: 200,
    },
    replier: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    },
  },

  { timestamps: true }
);

export default mongoose.model("Reply", ReplySchema);
