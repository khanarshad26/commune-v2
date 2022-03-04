import  mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
    ownername : {
        type: String,
        max: 100,
    },
    type : {
        type: String,
        max: 100,
        default : "Electronic",
    },
    title : {
        type: String,
        max: 100,
    },
    details : {
        type: String,
        max: 100,
    },
    price : {
        type: String,
        max: 100,
    },
    currentlyUsing : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    alloted : Boolean,

},{ timestamps: true })

export default mongoose.model("Resource", ResourceSchema);