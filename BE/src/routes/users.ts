import express from 'express';
import { auth, admin } from '../middleware/auth';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', auth, admin, getUsers);
router.get('/:id', auth, admin, getUser);
router.post('/', auth, admin, createUser);
router.put('/:id', auth, admin, updateUser);
router.delete('/:id', auth, admin, deleteUser);

export default router; 