import express from "express";
import Forum from "../models/Forum.js";
import User from "../models/User.js";
import Answer from "../models/Answer.js";
import Reply from "../models/Reply.js";
const router = express.Router();


//upload a question on forum
router.post('/question/:id', async(req, res) => {        //user_id
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try{
            const newForum = await Forum.create(req.body);
            const forum = await newForum.save();
            const currentUser = await User.findById(req.body.userId);
            const newUser = await currentUser.updateOne({ $push : { 'forumQuestions.asked' : forum._id}})
            res.status(200).send(newUser);
        }catch(err){
            res.status(500).send(err);
        }
    }else{
        res.status(200).send("invalid request");
    }  
})

//upload a answer on forum
router.post('/answer/:id', async(req, res) => {        //forum_id
    if(req.body.userId || req.body.isAdmin){
        try{
            const forum = await Forum.findById(req.params.id);
            const ans = await Answer.create({
                answer : req.body.answer,
                answerer : req.body.answerer || "Anonymous",
                time : req.body.time
            })
            const answer = await ans.save();
            await forum.updateOne({ $push : { 'answers' : ans } })
            const currentUser = await User.findById(req.body.userId);
            const newUser = await currentUser.updateOne({ $push : { 'forumQuestions.answered' : answer._id}})
            res.status(200).send(answer);
        }catch(err){
            res.status(500).send(err);
        }
    }else{
        res.status(200).send("invalid request");
    }  
})

//upload a reply on forum
router.post('/reply/:id', async(req, res) => {   //answer_id
    if(req.body.userId || req.body.isAdmin){
        try{
            const answer = await Answer.findById(req.params.id);
            const comment = await Reply.create({
                reply : req.body.reply,
                time : req.body.time,
                replier : req.body.replier,
            })
            const reply = await comment.save();
            
            await answer.updateOne({ $push : { 'replies' : comment } })
            const currentUser = await User.findById(req.body.userId);
            await currentUser.updateOne({ $push : { 'forumQuestions.replied' : reply._id}})
            res.status(200).send(currentUser);
        }catch(err){
            res.status(500).send(err);
        }
    }else{
        res.status(200).send("invalid request");
    }  
})

//delete a question on forum
router.delete('/question/:id', async(req, res) => {            //forum_id
    if(req.body.userId && req.body.isAdmin){
        try{
            // const currentUser = await User.findById(req.body.userId);
            await Forum.deleteOne({ _id: req.params.id })
            // visit again to see what's wrong
            // const newUser = await currentUser.updateOne({ $pull : { 'forumQuestions.asked' : {_id : req.params.id.toString()} }})
            res.status(200).json("deleted");
        }catch(err){
            res.status(500).json("error");
        }
    }else{
        res.status(200).json("invalid request");
    }  
})
//delete a reply on forum
router.delete('/reply/:id', async(req, res) => { //reply_id
    if(req.body.userId && req.body.isAdmin){
        try{
            await Reply.deleteOne({ _id: req.params.id })
            // visit again to see what's wrong
            // const currentUser = await User.findById(req.body.userId);
            // const newUser = await currentUser.updateOne({ $pull : { 'forumQuestions.asked' : {_id : req.params.id.toString()} }})
            res.status(200).json("deleted");
        }catch(err){
            res.status(500).json("error");
        }
    }else{
        res.status(200).json("invalid request");
    }  
})
//delete a answer on forum
router.delete('/answer/:id', async(req, res) => {
    if(req.body.userId && req.body.isAdmin){
        try{
            // const currentUser = await User.findById(req.body.userId);
            await Answer.deleteOne({ _id: req.params.id })
            // visit again to see what's wrong
            // const newUser = await currentUser.updateOne({ $pull : { 'forumQuestions.asked' : {_id : req.params.id.toString()} }})
            res.status(200).json("deleted");
        }catch(err){
            res.status(500).json("error");
        }
    }else{
        res.status(200).json("invalid request");
    }  
})
//update a question on forum
router.put('/question/:id', async(req, res) => {
    if(req.body.userId && req.body.isAdmin){
        try{        
            const forum = await Forum.findById(req.params.id);
            await forum.updateOne({ $set : {  title : req.body.title}})
            await forum.updateOne({ $set : {  desc : req.body.desc}})
            const update = await forum.updateOne({ $set : {  title : req.body.title}})
            res.status(200).send(update);
        }catch(err){
            res.status(500).send(err);
        }
    }else{
        res.status(200).send("invalid request");
    }  
})
//update a reply on forum
//update a answer on forum
//get a question on forum
//get answers on forum



export default router;