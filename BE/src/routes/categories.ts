import express from 'express';
import { auth } from '../middleware/auth';
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categories';

const router = express.Router();

router.get('/', auth, getCategories);
router.get('/:slug', auth, getCategory);
router.post('/', auth, createCategory);
router.put('/:slug', auth, updateCategory);
router.delete('/:slug', auth, deleteCategory);

export default router; 