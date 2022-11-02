const express = require('express');
const router = express.Router();
const { Post } = require('../Model/Post');
const { Counter } = require('../Model/Counter');

router.post('/submit', async (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counter) => {
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

router.post('/update', async (req, res) => {
  let temp = req.body;
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

router.post('/list', async (req, res) => {
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => res.status(400));
});

router.post('/detail', async (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => res.status(400));
});

router.post('/delete', async (req, res) => {
  let reqBody = req.body;
  Post.deleteOne({ postNum: reqBody.postNum })
    .then((results) => {
      if (results.acknowledged) {
        res.status(200).json({ success: true });
      }
    })
    .catch((err) => res.status(400));
});

module.exports = router;
