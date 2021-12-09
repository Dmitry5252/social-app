import express from "express";
const router = express.Router();

import { getProfile, setBio, getUsersProfile, subscribe } from "../controllers/profile";

router.get("/profile/:username", getUsersProfile);

router.get("/profile", getProfile);

router.post("/subscribe/:username", subscribe);

router.post("/bio/:username", setBio);

export default router;
