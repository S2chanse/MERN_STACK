const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const { Post } = require('./Model/Post.js');
const { Counter } = require('./Model/Counter.js');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  mongoose
    .connect(
      'mongodb+srv://indebtedness:pPkGm2kwwhCpEJOG@cluster0.l6bhxvy.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.error(`${err}`);
    });
});

app.get('/', (req, res) => {
  //__dirname : 현재경로
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/api/post/submit', async (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counter) => {
      console.log(counter);
      temp.postNum = counter.postNum;
      const communityPost = new Post(temp);
      communityPost.save().then(() => {
        //Counter의 postNum을 증가
        Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post('/api/post/update', async (req, res) => {
  let temp = req.body;
  console.log(temp);
  Post.updateOne(
    { postNum: temp.postNum },
    { $set: { title: temp.title, content: temp.content } }
  )
    .then(() => {
      Post.findOne({ postNum: Number(temp.postNum) })
        .exec()
        .then((doc) => {
          // console.log(doc);
          res.status(200).json({ success: true, post: doc });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post('/api/post/list', async (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => res.status(400));
});

app.post('/api/post/detail', async (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => res.status(400));
});

app.post('/api/post/delete', async (req, res) => {
  let reqBody = req.body;
  Post.deleteOne({ postNum: reqBody.postNum })
    .then((results) => {
      console.log(results);
      res.status(200).json({ success: true });
    })
    .catch((err) => res.status(400));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
/*
  1.post MongoDB 모델
  2.Client css(Bootstrap,Emotion)
*/
