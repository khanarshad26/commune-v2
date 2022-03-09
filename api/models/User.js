import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 20,
    },
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
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    type : {
      type : String,
      default : "Student",
    },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Institute',
    },
    membership : {
      club : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Club',
      }],
      association : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Association',
      }],
    },
    socilaMediaLinks: {
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      hackerrank: {
        type: String,
        default: "",
      },
      stackOverflow: {
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
    connections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    }],
    connectionRequests:[{
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
    relationship: {
      status: {
        type: String,
      },
    },
    events: {
      created: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
      }],
      participated: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
      }],
      bookmarked : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
      }]
    },
    workshops: {
      created: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workshop",
      }],
      participated: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workshop",
      }],
      bookmarked : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workshop",
      }]
    },
    projects: {
      created: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
      }],
      contributed: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
      }],
      bookmarked : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
      }]
    },
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
    profession: {
      type: String,
      default : ""
    },
    tagline : {
      type: String,
      default : "",
    },
    organization: {
      type: String,
      default : "",
    },
    educations:[{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Education',
    }],
    about: {
      type: String,
      max: 500,
      default : "",
    },
    experiences: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Experience'
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
    dob : {
      type : Date,
    },
    achievements : [{
      type : String,
      max : 1000
    }],
    interests : [{
      type : String,
      max : 1000
    }],
    certificates : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Certificate'
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
    languages : [{
      type : String,
      max : 20,
    }],
    skills : [{
      type : String,
      max : 20,
    }]
  },

  // },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
