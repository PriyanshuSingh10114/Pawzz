import { Router } from 'express';
import { getSuiteStats } from '../controllers/statsController.js';

const router = Router();

router.get('/suite', getSuiteStats);

export default router;
