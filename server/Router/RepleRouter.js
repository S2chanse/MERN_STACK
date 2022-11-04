const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Post } = require('../Model/Post');
const { Reple } = require('../Model/Reple');
const { User } = require('../Model/User');

router.post('/submit', async (req, res) => {
  let temp = {
    reple: req.body.reple,
  };
  try {
    const user = await User.findOne({ uid: req.body.uid }).exec();
    const post = await Post.findOne({ id: req.body.postid }).exec();
    temp.author = user._id;
    temp.postId = post._id;
    console.log(temp);
    const newReple = new Reple(temp);
    newReple.save(() => {
      Post.updateOne({ _id: req.body.postid }, { $inc: { repleNum: 1 } })
        .exec()
        .then(() => {
          return res.status(200).json({ success: true });
        });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false });
  }
});

router.post('/getRepleList', async (req, res) => {
  try {
    const repleList = await Reple.find({ postId: req.body.postid }).exec();
    console.log(repleList);
    res.status(200).json({ success: true, repleList: repleList });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false });
  }
});
module.exports = router;
