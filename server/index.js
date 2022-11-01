const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const { Post } = require("./Model/Post.js");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://indebtedness:pPkGm2kwwhCpEJOG@cluster0.l6bhxvy.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.error(`${err}`);
    });
});

app.get("/", (req, res) => {
  //__dirname : 현재경로
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/post/submit", async (req, res) => {
  let temp = req.body;
  const communityPost = new Post(temp);
  communityPost
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/post/list", async (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => res.status(400));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
/*
  1.post MongoDB 모델
  2.Client css(Bootstrap,Emotion)
*/
