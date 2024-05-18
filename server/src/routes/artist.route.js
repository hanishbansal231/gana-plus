import { Router } from 'express';
import { createArtist, getAllArtists, getArtistById, updateArtist } from '../controllers/artist.controller.js';

const router = Router();

router.post("/", createArtist);
router.get("/", getAllArtists);
router.get("/:aid", getArtistById);
router.put("/:aid", updateArtist);
export default router;