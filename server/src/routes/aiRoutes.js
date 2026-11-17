import { Router } from 'express';
import { handleGenerateCarousel, handleRegenerateSlide } from '../controllers/aiController.js';

const router = Router();

router.post('/generate-carousel', handleGenerateCarousel);
router.post('/regenerate-slide', handleRegenerateSlide);

export default router;

