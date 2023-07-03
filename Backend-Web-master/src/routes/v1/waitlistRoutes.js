import express from "express";
const router = express.Router();
import { getWaitlist, joinWaitlist } from '../../controllers/waitlist-controller.js'

router.get('/all', getWaitlist)

router.post('/join', joinWaitlist)

export default router;
