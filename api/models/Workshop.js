import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
    userId : {
        type : String,
        required: true,
    },
    openFor:{
        type : String,
        default : "Campus",
    },
    name:{
        type : String,
        max : 200,
    },
    hostname: {
        type : String,
        max : 200,
    },
    host : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cell"
    },
    institute : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Institute' ,
    },
    organizers: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'  
    }],

    from: {
        type : Date,
    },
    to: {
        type : Date,
    },
    profilePicture : {
        type : String,
    },
    coverPicture: {
        type : String,
    },
    description: {
        type : String,
        max : 1000,
    },
    venue: {
        type : String,
        max : 200,
    },
    summary : {
        type : String,
        max : 1000,
    },
    type : {
        type : String,
    },
    techStack : [{
        type : String,
    }],
    mode : {
        type : String,
        default : "Offline"
    },
    certificates : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Certificate'
    }],
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'  
    }],
  },
  { timestamps: true }
)

export default mongoose.model("Workshop", WorkshopSchema);