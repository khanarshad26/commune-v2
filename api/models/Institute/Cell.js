import mongoose from 'mongoose';

const CellSchema = new mongoose.Schema(
  {
    name: {
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
      hide : false,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    live : Boolean,
    type : {
      type: String,
    },
    category : {
      type: String,
    },
    description : {
      type: String,
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Institute',
    },
    department : {
        type: String,
        default : "Engineering",
    },
    members : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    socilaMediaLinks: {
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
    followings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    requests : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Address",
    },
    events: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
      }],
    projects: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
      }],
    workshops: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workshop",
      },
    teams: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Team",
    }],
    forumQuestions: {
      asked: {
        type: Array,
        default : [],
      },
      answered: {
        type: Array,
        default : [],
      },
      replied : {
        type: Array,
        default : [],
      },
    },
    facultyAdvisor: {
      type: String,
    },
    generalSecrataty: {
      type: String,
    },
    motto: {
      type: String,
    },
    about: {
      type: String,
      max: 500,
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
    certificates : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Certificate'
    }],
    documents : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Document',
    }],
    sponsors : [{
      name : String,
      profilePicture : String,
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Cell", CellSchema);
