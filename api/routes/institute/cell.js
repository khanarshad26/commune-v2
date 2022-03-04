import express from "express";
const router = express.Router();
import Cell from '../../models/Institute/Cell.js'
import Institute from "../../models/Institute/Institute.js";
import bcrypt from "bcrypt";
import User from "../../models/User.js"

//register cell
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const institute = await Institute.findById(req.body.institute); 

      //create new cell
      const newcell = new Cell({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type : req.body.type,
        department : req.body.department,
        institute : institute
      });
  
      //save cell and respond
      const cell = await newcell.save();
      await institute.updateOne({$push : { cells : cell}})
      res.status(200).json(cell);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //LOGIN cell
  router.post("/login", async (req, res) => {
    try {
      const cell = await Cell.findOne({ email: req.body.email });
      if(!cell){
        res.status(404).json("cell not found");
        return;
      }
      const validPassword = await bcrypt.compare(req.body.password, cell.password)
      if(!validPassword){
        res.status(400).json("wrong password")
        return;
      }
  
      res.status(200).json(cell)
    } catch (err) {
      res.status(500).json(err)
    }
  });

//update cell
router.put("/:id", async (req, res) => {
  if (req.body.cellId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const cell = await Cell.findByIdAndUpdate(req.params.id, {
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
    const cell = await Cell.findById(req.params.id);
    const response = await cell.updateOne({ $set : { profilePicture : `/assets/${req.body.profilePicture}`}})
    res.status(200).json(response);
   }catch(err){
     res.status(500),send(err);
   }
})

//get profile picture
router.get('/profilePicture/:id', async(req, res) => {
  try{
   const cell = await Cell.findById(req.params.id);
   const response = cell.profilePicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//update cover picture
router.put('/coverPicture/:id', async(req, res) => {
  try{
   const cell = await Cell.findById(req.params.id);
   const response = await cell.updateOne({ $set : { coverPicture : `/assets/${req.body.coverPicture}`}})
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//get cover picture
router.get('/coverPicture/:id', async(req, res) => {
  try{
   const cell = await Cell.findById(req.params.id);
   const response = cell.coverPicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//delete cell
router.delete("/:id", async (req, res) => {
  if (req.body.cellId === req.params.id || req.body.isAdmin) {
    try {
      await Cell.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a cell
router.get("/:id", async (req, res) => {
  try {
    const cell = await Cell.findById(req.params.id);
    res.status(200).json(cell);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //get all cells 
  router.get("/all/:id", async (req, res) => { //institute_id
    try {
      const cells = await Cell.find({institute : req.params.id});
      res.json(cells);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // get all clubs
  router.get("/all/club/:id", async (req, res) => { //institute_id
    try {
      const cells = await Cell.find({institute : req.params.id, type : "Club"});
      res.json(cells);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // get all association
  router.get("/all/association/:id", async (req, res) => { //institute_id
    try {
      const cells = await Cell.find({institute : req.params.id, type : "Association"});
      res.json(cells);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//follow a cell
router.put("/:id/follow", async (req, res) => {
  if (req.body.cellId !== req.params.id) {
    try {
      const cell = await Cell.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (!cell.followers.includes(req.body.userId)) {
        await cell.updateOne({ $push: { followers: user } });
        await user.updateOne({ $push: { followings: cell } });
        res.status(200).json("cell has been followed");
      } else {
        res.status(403).json("you allready follow this cell");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a cell
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.cellId !== req.params.id) {
      try {
        const cell = await Cell.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        if (cell.followers.includes(req.body.cellId)) {
          await cell.updateOne({ $pull: { followers: user._id } });
          await user.updateOne({ $pull: { followings: cell._id } });
          res.status(200).json("cell has been unfollowed");
        } else {
          res.status(403).json("you dont follow this cell");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });


  export default router;
