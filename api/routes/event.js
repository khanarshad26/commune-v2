import express from "express";
const router = express.Router();
import Event from '../models/Event.js';
import User from '../models/User.js';
import Institute from '../models/Institute/Institute.js'

//create Event
router.post("/", async (req, res) => {
    try {
      const newEvent = await Event.create(req.body);
      const event = await newEvent.save();
      const user = await User.findById(req.body.userId);
      const institute = await Institute.findById(user.institute);
      await institute.updateOne({ $push : { events : event} })
      await user.updateOne({ $push : { 'events.created' : event} })
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put("/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (project.userId === req.body.userId) {
        await event.updateOne({ $set: req.body });
        res.status(200).json("the event has been updated");
      } else {
        res.status(403).json("you can update only event created by you.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete
router.delete("/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (event.userId === req.body.userId) {
        await user.updateOne({ $pull : { 'events.created' : event._id }});
        await project.deleteOne();
        res.status(200).json("the event has been deleted");
  
      } else {
        res.status(403).json("you can delete only your event");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get campus events
router.get('/institute/all/:id', async(req, res) => {  //instituteId
  try{
    const events = await Event.find({ institute : req.params.id});
    res.status(200).json(events);
  }catch(err){
      res.status(500).json(err);
  }
})

//get cell events
router.get('/cell/all/:id', async(req, res) => {  //cellId
  try{
    const events = await Event.find({ institute : req.body.instituteId, host : req.params.id});
    res.status(200).json(events);
  }catch(err){
      res.status(500).json(err);
  }
})


//get all events created by user
router.get("/created/all/:id", async (req, res) => { //user_id
    try {
      const currentUser = await User.findById(req.params.id);
      const events = await Event.find({ userId: currentUser._id });
      res.json(events);
    } catch (err) {
      res.status(500).json(err);
    }
});

  //get all events 
router.get("/all/:id", async (req, res) => { //institute_id
  try {
    const allEvents = await Event.find();
    const nonCampusEvents = allEvents.filter(event => event.institute != req.params.id)
    res.json(nonCampusEvents);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a event
router.get("/:id", async (req, res) => { //event_id
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});


//participate in a event
router.post('/participate/:eventId/:userId', async(req, res) => {
  try{
    const event = await Event.findById(req.params.eventId);
    const user = await User.findById(req.params.userId);

    if(event.openFor === "Campus" && user.institute._id.toString()===event.institute._id.toString()){
      await user.updateOne({ $push : {'events.participated' : event}});
      await event.updateOne({ $push : {participants : user}});
      res.status(200).json('participated');
      return;
    }
    else if(event.openFor === "All"){
      await user.updateOne({ $push : {'events.participated' : event}});
      await event.updateOne({ $push : {participants : user}});
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