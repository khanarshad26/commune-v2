import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId : {
        type : String,
    },
    comment: {
      type: String,
    //   max: 1000,
    },
    commentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    },
    replies : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Reply',
    }],
    profilePicture : {
        type: String,
    },
    commentorName : {
        type: String,
    },
    like : {
        type : Number,
        default : 0,
    }
  },

  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
