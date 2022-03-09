import express from "express";
const router = express.Router();
import User from "../models/User.js";
// import bcrypt from "bcrypt";

//get all the connections
router.get('/:id', async (req, res) => {  //currentUser_id
    try{
        const currentUser = await User.findById(req.params.id);
        const connections = currentUser.connections;
        res.status(200).json(connections);
    }catch(err){
        res.status(500).json(err);
    }
})  

//get all the requests you sent
router.get('/connect/:id', async (req, res) => {  //currentUser_id
    try{
        const currentUser = await User.findById(req.params.id);
        const connections = await Promise.all(
            currentUser.requests.map((userId) => {
              return User.find({ _id : userId });
            })
        );
        res.status(200).json(...connections);
    }catch(err){
        res.status(500).json(err);
    }
})  

//get all the recommended connections
router.get('/recommended/:id', async (req, res) => {  //currentUser_id
    try{
        const allUsers = await User.find();
        const currentUser = await User.findById(req.params.id);
        const connections = allUsers.filter(user => {
            return user._id != req.params.id && !currentUser.followers.includes(req.params.id)
        })
        res.status(200).json(connections);
    }catch(err){
        res.status(500).json(err);
    }
})

//get all the requests you got
router.get('/requests/:id', async (req, res) => {  //currentUser_id
    try{
        const currentUser = await User.findById(req.params.id);
        const connections = await Promise.all(
            currentUser.connectionRequests.map((userId) => {
              return User.findById(userId);
            })
        );
        res.status(200).json(connections);
    }catch(err){
        res.status(500).json(err);
    }
})

//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: currentUser }});
          await currentUser.updateOne({ $push: { followings: user }});
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: currentUser._id } });
          await currentUser.updateOne({ $pull: { followings: user._id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

//sending connection request
router.put("/:id/request", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.connections.includes(req.body.userId) && !user.connectionRequests.includes(req.body.userId)) {
          await user.updateOne({ $push: { connectionRequests: currentUser } });
          await currentUser.updateOne({ $push: { requests: user } });
          res.status(200).json("user has been requested");
        } else {
          res.status(403).json("you allready requested this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant request yourself");
    }
  });
  
//accepting connection request
router.put("/:id/accept", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.connections.includes(req.body.userId)) {
          await user.updateOne({ $push: { connections: currentUser } });
          await currentUser.updateOne({ $push: { connections: user } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });

  //declining connection request
router.put("/:id/reject", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.connections.includes(req.body.userId)) {
          await user.updateOne({ $push: { connections: currentUser } });
          await currentUser.updateOne({ $push: { connections: user } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });

//get all the recommended connections
router.get('/post/:id', async (req, res) => {  //currentUser_id
    try{
        const currentUser = await User.findById(req.params.id);
        const posts = currentUser.posts;
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})



export default router;
