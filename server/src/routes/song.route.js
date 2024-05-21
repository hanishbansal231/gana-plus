import { Router } from "express";
import { createSong } from "../controllers/song.controller.js";
import upload from "../middlewares/multer.Middleware.js";

const router = Router();

router.post("/", upload.single("audio"), createSong);

export default router;