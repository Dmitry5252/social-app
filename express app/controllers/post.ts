import { Request, Response } from "express";
import User from "../model/user";

export const getPosts = async (req: Request, res: Response) => {
  let posts = [];
  try {
    const user = await User.getUserByToken(req.headers.access_token as string);
    for (let subbed of user.subbed) {
      const user = await User.getUserByID(subbed.toString());
      posts = posts.concat(user.posts.map((value) => ({ ...value, author: user.username })));
    }
    posts.sort((a, b) => +new Date(Date.parse(a.date)) - +new Date(Date.parse(b.date)));
    res.json(posts.reverse());
  } catch (e) {
    res.sendStatus(401);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const user = await User.getUserByUsername(req.params.profile);
    const post = { ...user.posts.find((value) => +value.date == +new Date(req.params.date)), author: req.params.profile };
    res.json({ ...post, comments: post.comments.reverse() });
  } catch (e) {
    res.sendStatus(404);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    if (req.body.text.length < 3) {
      res.sendStatus(400);
    } else {
      const user = await User.getUserByUsername(req.params.profile);
      user.addCommentToPost(new Date(req.params.date), req.body.text, await User.getUserByToken(req.headers.access_token as string));
      res.sendStatus(200);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};

export const global = async (req: Request, res: Response) => {
  let posts = [];
  for (let user of await User.getUsers()) {
    posts = posts.concat(user.posts.map((value) => ({ ...value, author: user.username })));
  }
  posts.sort((a, b) => +new Date(Date.parse(a.date)) - +new Date(Date.parse(b.date)));
  res.json(posts.reverse());
};

export const addPost = async (req: Request, res: Response) => {
  try {
    const user = await User.getUserByToken(req.headers.access_token as string);
    if (req.body.title.length < 3 || req.body.description < 3) {
      res.sendStatus(400);
    } else {
      user.addPost(req.body.title, req.body.description);
      res.sendStatus(200);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};
