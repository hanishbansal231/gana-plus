import { Router } from 'express';
import { createArtist } from '../controllers/artist.controller.js';

const router = Router();

router.post("/", createArtist);

export default router;