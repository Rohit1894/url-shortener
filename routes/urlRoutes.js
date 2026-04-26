import express from 'express';
import {
  createShortUrl,
  redirectUrl,
  getStats
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/api/shorten', createShortUrl);
router.get('/api/stats/:shortCode', getStats);
router.get('/:shortCode', redirectUrl);

export default router;