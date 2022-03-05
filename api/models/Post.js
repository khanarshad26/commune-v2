import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userType : {
      type: String,
    },
    institute : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Institute'
    },
    username: {
      type: String,
    },
    openFor :{
      type : String,
      default : "Campus"
    },
    type : {
      type : String,
      default : "General"
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    postImg : {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Comment',
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
