import express from "express";
const router = express.Router();

import { getPosts, getPost, addComment, global, addPost } from "../controllers/post";

router.get("/posts", getPosts);

router.get("/posts/:profile/:date", getPost);

router.post("/posts/:profile/:date", addComment);

router.get("/global", global);

router.post("/posts", addPost);

export default router;
