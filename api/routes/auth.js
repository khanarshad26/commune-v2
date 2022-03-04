import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
// import {uuid} from 'uuidv4';
import Institute from '../models/Institute/Institute.js'

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const institute = await Institute.findById(req.body.institute);

    //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        institute : institute,
        type : req.body.type
      });

      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);

    } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      res.status(404).json("user not found");
      return;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
      res.status(400).json("wrong password")
      return;
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

export default router;
