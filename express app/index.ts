import express from "express";
const port = process.env.PORT || 4000;
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

import authentificationRouter from "./routes/authentification";
import profileRouter from "./routes/profile";
import postRouter from "./routes/post";

app.use(authentificationRouter);
app.use(profileRouter);
app.use(postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
