import express from "express";
const router = express.Router();
import User from '../../models/User.js';

//create, update interest
router.post('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        (req.body.interest) 
            ? await user.updateOne({ $push : { interests : req.body.interest}}) 
            : res.status(200).json("not found");
    }catch(err){
        res.status(500).json(err);
    }
})

//get all
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const interests = user.interests;
        res.status(200).json(interests);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;