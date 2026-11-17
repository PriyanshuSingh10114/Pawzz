import { Router } from 'express';
import {
  getAutomationStatus,
  getAutomationLogs,
  handleSlidePilotWebhook,
  testN8nTrigger,
} from '../controllers/automationController.js';

const router = Router();

router.get('/status', getAutomationStatus);
router.get('/logs', getAutomationLogs);
router.post('/slidepilot/webhook', handleSlidePilotWebhook);
router.post('/test-trigger', testN8nTrigger);

export default router;
