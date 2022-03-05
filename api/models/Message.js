import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        message:{
            type:String,
            required:true
        },
        sender:{
            type:User,
            required:true
        },
        room:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
)