import { Router } from 'express';
import {
  getProviders,
  getProviderById,
  createProvider,
  submitCorrection,
} from '../controllers/providerController.js';

const router = Router();

router.get('/', getProviders);
router.post('/', createProvider);
router.get('/:id', getProviderById);
router.post('/:id/corrections', submitCorrection);

export default router;
