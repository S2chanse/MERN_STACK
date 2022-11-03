const express = require('express');
const router = express.Router();
const multer = require('multer');

const { User } = require('../Model/User');
const { Counter } = require('../Model/Counter');

router.post('/register', async (req, res) => {
  let temp = req.body;
  try {
    let counter = await Counter.findOne({ name: 'counter' }).exec();
    temp.userNum = counter.userNum;
    const registerUser = new User(temp);
    const result = await registerUser.save();
    //Counter의 postNum을 증가

    Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } }).then(
      () => {
        res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
});

module.exports = router;