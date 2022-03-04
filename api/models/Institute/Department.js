import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema(
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
    hod : {
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
    association : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Association",
    },
    resources : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resource",
    }],
    labs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Lab",
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
    addresses: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Address",
    },
    posts : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Post'
    }],
    summary : {
      type : String,
      max : 500,
      default : ""
    },
    doe : {
      type : Date,
    },
    achievements : [{
      type : String,
      max : 1000
    }],
    documents : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Document',
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Department", DepartmentSchema);
