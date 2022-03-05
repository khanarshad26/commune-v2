import express from "express";
const router = express.Router();
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

//comment on a post
router.post("/:id", async (req, res) => {  //post_id
    try {
      const post = await Post.findById(req.params.id);
    //   console.log(post)
      const user = await User.findById(req.body.userId);
    //   console.log(user)
      const comment = await Comment.create(req.body);
      await comment.save();
      await post.updateOne({ $push: { comments: comment } });
      res.status(200).json("commented");
    }catch (err) {
      res.status(500).json(err);
    }
});

//get all the comment of a post
router.get('/all/:id', async(req, res) => {
    try{
        // const post = await Post.findById(req.params.id);
        const comments = await Comment.find({postId : req.params.id});
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json(err);
    }
})


export default router;
