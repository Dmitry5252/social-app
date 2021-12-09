import express from "express";
const router = express.Router();

import { register, login } from "../controllers/authentification";

router.post("/registration", register);

router.post("/login", login);

export default router;
