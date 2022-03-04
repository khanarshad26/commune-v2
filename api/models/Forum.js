import mongoose from 'mongoose';
// import Answer from './Answer.js';

const ForumSchema = new mongoose.Schema({
    title : {
        type : String,
        max : 1000,
        require : true,
    },
    desc : {
        type : String,
        max : 1000,
        require : true,
    },
    topics : [{
        type : String,
        max : 200,
        require : true,
    }],
    time : {
        type : String,
        max : 1000,
    },
    asker : {
        type : String,
        max : 100,
    },

    updatedAt : {
        type : String,
        max : 100,
    },
    resolved : Boolean,

    isAnonymous : Boolean,

    answers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Answer',
    }],

},{ timestamps: true })

export default mongoose.model("Forum", ForumSchema);