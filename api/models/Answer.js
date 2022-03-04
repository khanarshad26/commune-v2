import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    isAnonymous: Boolean,

    answer: {
      type: String,
      max: 2000,
    },
    answerer: {
      type: String,
      max: 200,
    },
    answererProfession: {
      type: String,
      max: 200,
    },
    time: {
      type: String,
      max: 200,
    },
    upvote: {
      type: Number,
      max: 10,
    },
    downvote: {
      type: Number,
      max: 10,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      }],
  },
  { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);
