import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema(
  {
    userId : {
      type: String,
      required: true,
    },
    name : {
        type: String,
        required: true,
    },
    serialno : String,
    issueDate : Date,
    expiryDate : Date,
    expires : Boolean,
    event : String,
    desc : {
      type: String,
      max : 50,
    },
    file : {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", CertificateSchema);
