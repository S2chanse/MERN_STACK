const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const config = require('./config/key');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('./image'));

app.use('/api/post', require('./Router/PostRouter'));
app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
/*
  1.post MongoDB 모델
  2.Client css(Bootstrap,Emotion)
*/
