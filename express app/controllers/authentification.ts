import { Request, Response } from "express";
import { required, email, minLength, maxLength, composeValidators } from "../utils/validators";
import User from "../model/user";

export const register = async (req: Request, res: Response) => {
  if (composeValidators(required, email)(req.body.email) || composeValidators(required, minLength, maxLength)(req.body.name) || composeValidators(required, minLength, maxLength)(req.body.password)) {
    res.sendStatus(401);
  } else if (await User.getUserByEmail(req.body.email)) {
    res.status(401).json("Email already used");
  } else {
    const user = new User(req.body.email, req.body.name, req.body.password);
    user.save();
    res.json({ access_token: await user.addToken(), username: user.username });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.getUserByEmail(req.body.email);
    if (user.password == req.body.password) {
      res.json({ access_token: await user.addToken(), username: user.username });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};
