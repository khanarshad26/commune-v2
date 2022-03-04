import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    userId : {
        type: String,
        required: true,
    },
    teamName : {
        type : String,
        max : 100,
    },
    thumbnail : {
        type : String,
        max : 200,
    },
    title : {
        type : String,
        max : 50,
    },
    teamMembers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'  
    }],
    from : {
        type : Date,
    },
    to : {
        type : Date,
    },
    current : Boolean,
    techStack : [{
        type : String,
        max : 200,
    }],
    assignment : {
        type : Array,
        default : [],
    },
    projectSummary : {
        type : String,
        max : 1000,
    },
    description : {
        type : String,
        max : 1000,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Project", ProjectSchema);