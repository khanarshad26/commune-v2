import express from "express";
const router = express.Router();
import Post from "../models/Post.js";
import  User from "../models/User.js";
import Cell from "../models/Institute/Cell.js";
import Institute from "../models/Institute/Institute.js"

//create a post
router.post("/", async (req, res) => {
  const newPost = await Post.create(req.body);
  try {
    const savedPost = await newPost.save();
    if(req.body.userType === "Student" || req.body.userType === "Faculty"){
      // const savedPost = await newPost.save();
      console.log(1)
      const user = await User.findById(req.body.userId);
      await user.updateOne({ $push : { posts : savedPost} })
      res.status(200).json(savedPost);
    }else if(req.body.userType === "Club" || req.body.userType === "Association"){
      console.log(2)
      // const savedPost = await newPost.save();
      const cell = await Cell.findById(req.body.userId);
      await cell.updateOne({ $push : { posts : savedPost} })
      res.status(200).json(savedPost);
    }else if(req.body.userType === "Institute"){
      console.log(3)
      // const savedPost = await newPost.save();
      const institute = await Institute.findById(req.body.userId);
      await institute.updateOne({ $push : { posts : savedPost} })
      res.status(200).json(savedPost);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (post.userId === req.body.userId) {
      await user.updateOne({ $pull : { posts : post._id }});
      await post.deleteOne();
      res.status(200).json("the post has been deleted");

    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//comment on a post
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    {
      await post.updateOne({ $push: { comments: req.body } });
      res.status(200).json("commented");
    }
  }catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/all/:type/:id", async (req, res) => { //user_id
  try {
    if(req.params.type === "Institute"){
      const currentUser = await Institute.findById(req.params.id);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Post.find({ institute : currentUser._id })
      res.json(userPosts.concat(...friendPosts))
    }
    // const currentUser = await User.findById(req.params.id);
    // const userPosts = await Post.find({ userId: currentUser._id });
    // const friendPosts = await Promise.all(
    //   currentUser.followings.map((friendId) => {
    //     return Post.find({ userId: friendId });
    //   })
    // );
    // res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
