import { Router } from 'express';
import { getProgrammes, getProgrammeBySlug } from '../controllers/programmeController.js';

const router = Router();

router.get('/', getProgrammes);
router.get('/:slug', getProgrammeBySlug);

export default router;
