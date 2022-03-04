import express from "express";
const router = express.Router();
import User from '../../models/User.js';

//create, update and delete about
router.post('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const about = await user.updateOne({ $set : { about : req.body.about}}); 
        res.status(200).json(about);
    }catch(err){
        res.status(500).json(err);
    }
})

//read
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const about = user.about;
        res.status(200).json(about);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;