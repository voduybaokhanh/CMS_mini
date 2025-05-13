import express, { Request, Response } from 'express';
import { signIn, signUp } from '../controllers/auth';

const router = express.Router();

router.post('/signin', async (req: Request, res: Response) => {
    await signIn(req, res);
});

router.post('/signup', async (req: Request, res: Response) => {
    await signUp(req, res);
});

export default router; 