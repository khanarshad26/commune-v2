import mongoose from 'mongoose';

const LabSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    institute : {
      type: String,
      require: true,
    },
    head : {
        type: String,
        require: true,
    },
    faculties : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    about: {
        type: String,
        max: 500,
        default : "",
    },
    resources : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resource",
    }],
    profilePicture: {
      type: String,
      default: "/assets/noAvatar.png",
    },
    coverPicture: {
      type: String,
      default: '/assets/coverImage.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Address",
    },
    summary : {
      type : String,
      max : 500,
      default : ""
    },
    doe : {
      type : Date,
    },
    documents : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Document',
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Lab", LabSchema);
