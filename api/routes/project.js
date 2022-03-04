import express from "express";
const router = express.Router();
import Project from '../models/Project.js';
import User from '../models/User.js';

//create project
router.post("/", async (req, res) => {
    const newProject = await Project.create(req.body);
    try {
      const project = await newProject.save();
      const user = await User.findById(req.body.userId);
      await user.updateOne({ $push : { 'projects.created' : project} })
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update
router.put("/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (project.userId === req.body.userId) {
        await project.updateOne({ $set: req.body });
        res.status(200).json("the project has been updated");
      } else {
        res.status(403).json("you can update only projects created by you.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete
router.delete("/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (project.userId === req.body.userId) {
        await user.updateOne({ $pull : { 'projects.created' : project._id }});
        await project.deleteOne();
        res.status(200).json("the project has been deleted");
  
      } else {
        res.status(403).json("you can delete only your project");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get campus projects
//get outside campus projects
//get my projects
router.get("/all/:id", async (req, res) => { //user_id
    try {
      const currentUser = await User.findById(req.params.id);
      const projects = await Project.find({ userId: currentUser._id });
      res.json(projects);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a project
router.get("/:id", async (req, res) => { //project_id
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});


//contribution work

export default router;