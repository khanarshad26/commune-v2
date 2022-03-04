import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
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
    live : Boolean,
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
    category : {
        type : String,
    },
    techStack : [{
        type : String,
    }],
    tags : [{
        type : String,
    }],
    mode : {
        type : String,
        default : "Offline"
    },
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'  
    }],
    certificates : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Certificate'
    }],
  },
  { timestamps: true }
)

export default mongoose.model("Event", EventSchema);