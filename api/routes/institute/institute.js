import express from "express";
const router = express.Router();
import Institute from "../../models/Institute/Institute.js";
import bcrypt from "bcrypt";
import User from "../../models/User.js"

//register institute
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new institute
      const newInstitute = new Institute({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type : req.body.type
      });

      //save institute and respond
      const institute = await newInstitute.save();
      res.status(200).json(institute);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //LOGIN institute
  router.post("/login", async (req, res) => {
    try {
      const institute = await Institute.findOne({ email: req.body.email });
      if(!institute){
        res.status(404).json("institute not found");
        return;
      }
      const validPassword = await bcrypt.compare(req.body.password, institute.password)
      if(!validPassword){
        res.status(400).json("wrong password")
        return;
      }
  
      res.status(200).json(institute)
    } catch (err) {
      res.status(500).json(err)
    }
  });

//update institute
router.put("/:id", async (req, res) => {
  if (req.body.instituteId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const institute = await Institute.findByIdAndUpdate(req.params.id, {
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
    const institute = await Institute.findById(req.params.id);
    const response = await institute.updateOne({ $set : { profilePicture : `/assets/${req.body.profilePicture}`}})
    res.status(200).json(response);
   }catch(err){
     res.status(500),send(err);
   }
})

//get profile picture
router.get('/profilePicture/:id', async(req, res) => {
  try{
   const institute = await Institute.findById(req.params.id);
   const response = institute.profilePicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//update cover picture
router.put('/coverPicture/:id', async(req, res) => {
  try{
   const institute = await Institute.findById(req.params.id);
   const response = await institute.updateOne({ $set : { coverPicture : `/assets/${req.body.coverPicture}`}})
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//get cover picture
router.get('/coverPicture/:id', async(req, res) => {
  try{
   const institute = await Institute.findById(req.params.id);
   const response = institute.coverPicture;
   res.status(200).json(response);
  }catch(err){
    res.status(500),send(err);
  }
})

//delete institute
router.delete("/:id", async (req, res) => {
  if (req.body.instituteId === req.params.id || req.body.isAdmin) {
    try {
      await Institute.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a institute
router.get("/:id", async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);
    res.status(200).json(institute);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a institute
router.put("/:id/follow", async (req, res) => {
  if (req.body.instituteId !== req.params.id) {
    try {
      const institute = await Institute.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (!institute.followers.includes(req.body.userId)) {
        await institute.updateOne({ $push: { followers: user } });
        await user.updateOne({ $push: { followings: institute } });
        res.status(200).json("institute has been followed");
      } else {
        res.status(403).json("you allready follow this institute");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a institute
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.instituteId !== req.params.id) {
      try {
        const institute = await Institute.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        if (institute.followers.includes(req.body.instituteId)) {
          await institute.updateOne({ $pull: { followers: user._id } });
          await user.updateOne({ $pull: { followings: institute._id } });
          res.status(200).json("institute has been unfollowed");
        } else {
          res.status(403).json("you dont follow this institute");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });


  export default router;
