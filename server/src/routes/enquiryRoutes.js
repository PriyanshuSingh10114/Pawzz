import { Router } from 'express';
import { submitEnquiry, getEnquiries } from '../controllers/enquiryController.js';

const router = Router();

router.post('/', submitEnquiry);
router.get('/', getEnquiries);

export default router;

