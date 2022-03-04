import express from "express";
const router = express.Router();
import User from '../../models/User.js';
import Experience from "../../models/Experience.js";

//create
router.post("/", async (req, res) => {
    const newExperience = await Experience.create(req.body);
    try {
      const experience = await newExperience.save();
      const user = await User.findById(req.body.userId);
      await user.updateOne({ $push : { 'experiences' : experience} })
      res.status(200).json(experience);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put('/:id', async(req, res) => {       //experience_id
    try{
        const experience = await Experience.findById(req.params.id);
        const field = req.body.field;
        const fieldVal = req.body.fieldVal;
        await experience.updateOne({ $set : { 'req.body.field' : fieldVal }})
        res.status(200).json("updated");
    }catch(err){
        res.status(500).json(err);
    }
})
 
//delete
router.delete("/:id", async (req, res) => {
    try {
      const experience = await Experience.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (experience.userId === req.body.userId) {
        await user.updateOne({ $pull : { 'experiences' : experience._id }});
        await experience.deleteOne();
        res.status(200).json("the experience has been deleted");
  
      } else {
        res.status(403).json("you can delete only your experience");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get my experience
router.get("/all/:id", async (req, res) => { //user_id
    try {
      const currentUser = await User.findById(req.params.id);
      const experiences = await Experience.find({ userId: currentUser._id });
      res.json(experiences);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a experience
router.get("/:id", async (req, res) => { //experience_id
  try {
    const experience = await Experience.findById(req.params.id);
    res.json(experience);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;