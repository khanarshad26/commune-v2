import mongoose from 'mongoose';

const InstituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // require: true,
      min: 3,
      max: 20,
    },
    username : {
      type: String,
      // require: true,
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
    type : {
      type: String,
      default:"Institute",
    },
    about: {
        type: String,
        max: 500,
        default : "",
    },
    vision: {
        type: String,
        max: 500,
        default : "",
    },
    mission: {
        type: String,
        max: 500,
        default : "",
    },
    announcements : [{
        type: String,
        max: 500,
        default : "",
    }],
    publications : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Publication",
    }],
    pressReleases : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "PressRelease",
    }],
    cells : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cell",
    }],
    resources : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resource",
    }],
    labs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Lab",
    }],
    departments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Department",
    }],
    socilaMediaLinks: {
      linkedin: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
      others: {
        link: String,
        plateform: String,
      },
    },
    profilePicture: {
      type: String,
      default: "/assets/noAvatar.png",
    },
    coverPicture: {
      type: String,
      default: '/assets/coverImage.png',
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    addresses: {
      permanent: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address",
      },
      current: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address",
      },
    },
    events: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
      }],
    workshops: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workshop",
    }],
    teams: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Team",
    }],
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
    notifications : [{
      msg : {
        type : String,
        max : 500,
      },
      msgTime : {
        type : Date,
      }
    }],
    documents : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Document',
    }],
  },

  // },
  { timestamps: true }
);

export default mongoose.model("Institute", InstituteSchema);
