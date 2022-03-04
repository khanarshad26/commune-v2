import express from "express";
const router = express.Router();
import User from '../../models/User.js';
import Education from "../../models/Education.js";

//create
router.post("/", async (req, res) => {
    const newEducation = await Education.create(req.body);
    try {
      const education = await newEducation.save();
      const user = await User.findById(req.body.userId);
      await user.updateOne({ $push : { 'educations' : education} })
      res.status(200).json(education);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put('/:id', async(req, res) => {       //Education_id
    try{
        const education = await Education.findById(req.params.id);
        const field = req.body.field;
        const fieldVal = req.body.fieldVal;
        await education.updateOne({ $set : { 'req.body.field' : fieldVal }})
        res.status(200).json("updated");
    }catch(err){
        res.status(500).json(err);
    }
})
 
//delete
router.delete("/:id", async (req, res) => {
    try {
      const education = await Education.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (education.userId === req.body.userId) {
        await user.updateOne({ $pull : { 'educations' : education._id }});
        await education.deleteOne();
        res.status(200).json("the education has been deleted");
  
      } else {
        res.status(403).json("you can delete only your education");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get my educations
router.get("/all/:id", async (req, res) => { //user_id
    try {
      const currentUser = await User.findById(req.params.id);
      const educations = await Education.find({ userId: currentUser._id });
      res.json(educations);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a education
router.get("/:id", async (req, res) => { //education_id
  try {
    const education = await Education.findById(req.params.id);
    res.json(education);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;