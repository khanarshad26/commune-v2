import express from "express";
import aboutRoute from './about.js'
import achievementsRoute from './achievements.js';
const router = express.Router();

router.use('/about', aboutRoute);
router.use('/achievements', achievementsRoute);

export default router;