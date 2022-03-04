import express from "express";
const router = express.Router();
import User from '../../models/User.js';

//create, update achievements
router.post('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        (req.body.achievement) 
            ? await user.updateOne({ $push : { achievements : req.body.achievement}}) 
            : res.status(200).json("not found");
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        await user.updateOne({ $pull : { achievements : { id : req.body.achievementId}}})
    }catch(err){
        res.status(500).json(err);
    }
})

//get all
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const achievements = user.achievements;
        res.status(200).json(achievements);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;