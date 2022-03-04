import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    userId : {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required: true,
      },
    thumbnail: String,
    project: String,
    teamMembers: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'  
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Team", TeamSchema);
