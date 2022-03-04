import express from "express";
const router = express.Router();
import Workshop from '../models/Workshop.js';
import User from '../models/User.js';
import Institute from '../models/Institute/Institute.js'

//create workshop
router.post("/", async (req, res) => {
    try {
      const newworkshop = await Workshop.create(req.body);
      const workshop = await newworkshop.save();
      const user = await User.findById(req.body.userId);
      const institute = await Institute.findById(user.institute);
      await institute.updateOne({ $push : { workshops : workshop} })
      await user.updateOne({ $push : { 'workshops.created' : workshop} })
      res.status(200).json(workshop);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put("/:id", async (req, res) => {
    try {
      const workshop = await Workshop.findById(req.params.id);
      if (project.userId === req.body.userId) {
        await workshop.updateOne({ $set: req.body });
        res.status(200).json("the workshop has been updated");
      } else {
        res.status(403).json("you can update only workshop created by you.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete
router.delete("/:id", async (req, res) => {
    try {
      const workshop = await Workshop.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (workshop.userId === req.body.userId) {
        await user.updateOne({ $pull : { 'workshops.created' : workshop._id }});
        await project.deleteOne();
        res.status(200).json("the workshop has been deleted");
  
      } else {
        res.status(403).json("you can delete only your workshop");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get campus workshops
router.get('/institute/all/:id', async(req, res) => {  //instituteId
  try{
    const workshops = await Workshop.find({ institute : req.params.id});
    res.status(200).json(workshops);
  }catch(err){
      res.status(500).json(err);
  }
})


//get all workshops created by user
router.get("/created/all/:id", async (req, res) => { //user_id
    try {
      const currentUser = await User.findById(req.params.id);
      const workshops = await Workshop.find({ userId: currentUser._id });
      res.json(workshops);
    } catch (err) {
      res.status(500).json(err);
    }
});

  //get all workshops 
router.get("/all/:id", async (req, res) => { //institute_id
  try {
    const allworkshops = await Workshop.find();
    const nonCampusworkshops = allworkshops.filter(workshop => workshop.institute != req.params.id)
    res.json(nonCampusworkshops);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get cell events
router.get('/cell/all/:id', async(req, res) => {  //cellId
  try{
    const workshops = await Workshop.find({ institute : req.body.instituteId, host : req.params.id});
    res.status(200).json(workshops);
  }catch(err){
      res.status(500).json(err);
  }
})

//get a workshop
router.get("/:id", async (req, res) => { //workshop_id
  try {
    const workshop = await Workshop.findById(req.params.id);
    res.json(workshop);
  } catch (err) {
    res.status(500).json(err);
  }
});


//participate in a workshop
router.post('/participate/:workshopId/:userId', async(req, res) => {
  try{
    const workshop = await Workshop.findById(req.params.workshopId);
    const user = await User.findById(req.params.userId);

    if(workshop.openFor === "Campus" && user.institute._id.toString()===workshop.institute._id.toString()){
      await user.updateOne({ $push : {'workshops.participated' : workshop}});
      await workshop.updateOne({ $push : {participants : user}});
      res.status(200).json('participated');
      return;
    }
    else if(workshop.openFor === "All"){
      await user.updateOne({ $push : {'workshops.participated' : workshop}});
      await workshop.updateOne({ $push : {participants : user}});
      res.status(200).json('participated');
      return;
    }
    else{
      res.status(200).json('you cant participate');
      return;
    }
  }catch(err){
    res.status(500).json(err);
  }
})

export default router;