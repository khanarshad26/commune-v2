import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//update profile picture
router.put('/profilePicture/:id', async(req, res) => {
   try{
    const user = await User.findById(req.params.id);
    const response = await user.updateOne({ $set : { profilePicture : `/assets/${req.body.profilePicture}`}})
    res.status(200).json(response);
   }catch(err){
     res.status(500),send(err);
   }
})

//get profile picture
router.get('/profilePicture/:id', async(req, res) => {
  try{
   const user = await User.findById(req.params.id);
   const response = user.profilePicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//update cover picture
router.put('/coverPicture/:id', async(req, res) => {
  try{
   const user = await User.findById(req.params.id);
   const response = await user.updateOne({ $set : { coverPicture : `/assets/${req.body.coverPicture}`}})
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//get cover picture
router.get('/coverPicture/:id', async(req, res) => {
  try{
   const user = await User.findById(req.params.id);
   const response = user.coverPicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: currentUser } });
        await currentUser.updateOne({ $push: { followings: user } });
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

//sending connection request
router.put("/:id/request", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.connections.includes(req.body.userId)) {
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

  export default router;
