import { Request, Response } from "express";
import User from "../model/user";
import { Post } from "../model/user";

export const getUsersProfile = async (req: Request, res: Response) => {
  let user: User, posts: Post[];
  try {
    user = await User.getUserByUsername(req.params.username);
    posts = user.posts.map((element) => ({ ...element, author: user.username })).reverse();
  } catch (e) {
    res.sendStatus(404);
  }

  let showSubscribe: boolean;
  let buttonStatus: boolean;
  try {
    showSubscribe = !((await User.getUserByToken(req.headers.access_token as string)).username == req.params.username);
    buttonStatus = (await User.getUserByToken(req.headers.access_token as string)).subbed.map((e) => e.toString()).includes((await User.getUsers()).find((value) => value.username == req.params.username)._id.toString());
  } catch (e) {
    showSubscribe = true;
    buttonStatus = false;
  }
  res.json({
    username: user.username,
    bio: user.bio,
    posts,
    showSubscribe,
    buttonStatus,
  });
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.getUserByToken(req.headers.access_token as string);
    res.json({ username: user.username });
  } catch (e) {
    res.sendStatus(401);
  }
};

export const subscribe = async (req: Request, res: Response) => {
  try {
    const user = await User.getUserByToken(req.headers.access_token as string);
    const users = await User.getUsers();
    const subUser = users.find((value) => value.username == req.params.username);
    user.subscribe(subUser._id.toString());
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(401);
  }
};

export const setBio = async (req: Request, res: Response) => {
  try {
    const user = await User.getUserByToken(req.headers.access_token as string);
    user.setBio(req.body.bio);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(401);
  }
};
