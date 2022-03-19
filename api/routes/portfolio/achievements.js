import express from "express";
const router = express.Router();
import User from '../../models/User.js';
import Achievement from "../../models/Achievement.js";

//create
router.post("/", async (req, res) => {
    const newAchievement = await Achievement.create(req.body);
    try {
      const achievement = await newAchievement.save();
      const user = await User.findById(req.body.userId);
      await user.updateOne({ $push : { 'achievements' : achievement} })
      res.status(200).json(Achievement);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put('/:id', async(req, res) => {       //Achievement_id
    try{
        const Achievement = await Achievement.findById(req.params.id);
        const field = req.body.field;
        const fieldVal = req.body.fieldVal;
        await Achievement.updateOne({ $set : { 'req.body.field' : fieldVal }})
        res.status(200).json("updated");
    }catch(err){
        res.status(500).json(err);
    }
})
 
//delete
router.delete("/:id", async (req, res) => {
    try {
      const Achievement = await Achievement.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (Achievement.userId === req.body.userId) {
        await user.updateOne({ $pull : { 'Achievements' : Achievement._id }});
        await Achievement.deleteOne();
        res.status(200).json("the Achievement has been deleted");
  
      } else {
        res.status(403).json("you can delete only your Achievement");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get my Achievements
router.get("/all/:id", async (req, res) => { //user_id
    try {
      const currentUser = await User.findById(req.params.id);
      const Achievements = await Achievement.find({ userId: currentUser._id });
      res.json(Achievements);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a Achievement
router.get("/:id", async (req, res) => { //Achievement_id
  try {
    const Achievement = await Achievement.findById(req.params.id);
    res.json(Achievement);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;