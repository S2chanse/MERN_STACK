const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Post } = require('../Model/Post');
const { Counter } = require('../Model/Counter');
const { User } = require('../Model/User');

router.post('/submit', async (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          console.log(userInfo);
          temp.author = userInfo._id;
          const communityPost = new Post(temp);
          communityPost.save().then(() => {
            //Counter의 postNum을 증가
            Counter.updateOne(
              { name: 'counter' },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
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
    { $set: { title: temp.title, content: temp.content, image: temp.image } }
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
    .populate('author')
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => res.status(400));
});

router.post('/detail', async (req, res) => {
  console.log(req.body);
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate('author')
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/img/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400);
    } else {
      console.log(res.req.file);
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});
module.exports = router;
