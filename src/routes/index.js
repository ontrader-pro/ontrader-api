import { Router } from 'express';
import { getIndexData } from '../controllers/indexController.js';

const router = Router();
router.get('/index-data', getIndexData);
export default router;
