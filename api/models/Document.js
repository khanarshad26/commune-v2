import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema(
  {
    userId : {
      type: String,
      required: true,
    },
    title : {
        type: String,
        required: true,
      },
    remark : String,
    type : String,
    file : {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", DocumentSchema);
