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
    res.status(500),json(err);
   }
})

//get profile picture
router.get('/profilePicture/:id', async(req, res) => {
  try{
   const user = await User.findById(req.params.id);
   const response = user.profilePicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),json(err);
  }
})

//update cover picture
router.put('/coverPicture/:id', async(req, res) => {
  try{
   const user = await User.findById(req.params.id);
   const response = await user.updateOne({ $set : { coverPicture : `/assets/${req.body.coverPicture}`}})
   res.status(200).json(response);
  }catch(err){
    res.status(500),json(err);
  }
})

//get cover picture
router.get('/coverPicture/:id', async(req, res) => {
  try{
   const user = await User.findById(req.params.id);
   const response = user.coverPicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),json(err);
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

//get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
