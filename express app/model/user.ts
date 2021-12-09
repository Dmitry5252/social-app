import MongoDb from "../db";

import { ObjectId } from "mongodb";

export interface Comment {
  text: string;
  date: Date;
  author: string;
}

export interface Post {
  title: string;
  description: string;
  date: Date;
  comments: Comment[];
}

interface User {
  email: string;
  username: string;
  password: string;
  _id: ObjectId;
  posts: Post[];
  bio: string;
  subbed: ObjectId[];
}

class User {
  constructor(email: string, username: string, password: string, _id = new ObjectId(), posts: Post[] = [], bio = "", subbed: ObjectId[] = []) {
    this.email = email;
    this.username = username;
    this.password = password;
    this._id = _id;
    this.posts = posts;
    this.bio = bio;
    this.subbed = subbed;
  }

  save = () => {
    MongoDb.then((client) => client.db("socialApp").collection("users").insertOne({ email: this.email, username: this.username, password: this.password, _id: this._id, posts: this.posts, bio: this.bio, subbed: this.subbed }));
  };

  setBio = (bio: string) => {
    this.bio = bio;
    MongoDb.then((client) =>
      client
        .db("socialApp")
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { bio: this.bio } })
    );
  };

  subscribe = (id: string) => {
    if (this.subbed.map((e) => e.toString()).includes(id)) {
      this.subbed.splice(this.subbed.map((e) => e.toString()).indexOf(id), 1);
    } else {
      this.subbed.push(new ObjectId(id));
    }
    MongoDb.then((client) =>
      client
        .db("socialApp")
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { subbed: this.subbed } })
    );
  };

  getPost = (date: Date) => this.posts.find((value) => +value.date == +date);

  addPost = (title: string, description: string) => {
    this.posts.push({ title, description, date: new Date(), comments: [] });
    MongoDb.then((client) =>
      client
        .db("socialApp")
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { posts: this.posts } })
    );
  };

  addCommentToPost = (date: Date, text: string, sender: User) => {
    this.getPost(date).comments.push({ text, date: new Date(), author: sender.username });
    MongoDb.then((client) =>
      client
        .db("socialApp")
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { posts: this.posts } })
    );
  };

  addToken = async () => {
    const token = newToken();
    MongoDb.then((client) => client.db("socialApp").collection("tokens").insertOne({ user: this._id, token }));
    return token;
  };

  static checkToken = async (token: string) => {
    const user = await MongoDb.then((client) => client.db("socialApp").collection("tokens").findOne({ token }));
    return user ? true : false;
  };

  static getUsers = async () =>
    await MongoDb.then((client) =>
      client
        .db("socialApp")
        .collection("users")
        .find()
        .toArray()
        .then((array) => array.map((e) => new User(e.email, e.username, e.password, e._id, e.posts, e.bio, e.subbed)))
    );

  static getUserByID = async (idValue: string) => {
    const user = await MongoDb.then((client) =>
      client
        .db("socialApp")
        .collection("users")
        .findOne({ _id: new ObjectId(idValue) })
    );
    if (user) {
      return new User(user.email, user.username, user.password, user._id, user.posts, user.bio, user.subbed);
    } else {
      return null;
    }
  };

  static getUserByEmail = async (emailValue: string) => {
    const user = await MongoDb.then((client) => client.db("socialApp").collection("users").findOne({ email: emailValue }));
    if (user) {
      return new User(user.email, user.username, user.password, user._id, user.posts, user.bio, user.subbed);
    } else {
      return null;
    }
  };

  static getUserByUsername = async (usernameValue: string) => {
    const user = await MongoDb.then((client) => client.db("socialApp").collection("users").findOne({ username: usernameValue }));
    if (user) {
      return new User(user.email, user.username, user.password, user._id, user.posts, user.bio, user.subbed);
    } else {
      return null;
    }
  };

  static getUserByToken = async (token: string) => {
    const userValue = await MongoDb.then((client) => client.db("socialApp").collection("tokens").findOne({ token }));
    if (userValue) {
      return await User.getUserByID(userValue.user);
    } else {
      return null;
    }
  };
}

const newToken = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

export default User;
