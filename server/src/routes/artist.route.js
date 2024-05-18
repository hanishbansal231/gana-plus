import { Router } from 'express';
import { createArtist, getAllArtists, getArtistById } from '../controllers/artist.controller.js';

const router = Router();

router.post("/", createArtist);
router.get("/", getAllArtists);
router.get("/:aid", getArtistById);

export default router;