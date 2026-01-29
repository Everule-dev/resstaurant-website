import express from 'express';
import { getAllMenuItems, getMenuItemsByCategory, searchMenuItems } from '../controllers/menu.controller';

const router = express.Router();

router.get('/', getAllMenuItems);
router.get('/search', searchMenuItems); // Place before :categoryId to avoid collision
router.get('/:categoryId', getMenuItemsByCategory);

export default router;
