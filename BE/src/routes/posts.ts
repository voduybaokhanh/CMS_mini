import express from 'express';
import { auth } from '../middleware/auth';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/posts';

const router = express.Router();

router.get('/', auth, getPosts);
router.get('/:slug', auth, getPost);
router.post('/', auth, createPost);
router.put('/:slug', auth, updatePost);
router.delete('/:slug', auth, deletePost);

export default router; 