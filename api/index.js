/**
 * Module dependencies
 */

const express = require('express');
const api = express();
const chords = require('./chords.json');
const port = process.env.PORT || 3000;


api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


api.get('/chords', (req, res) => {
  res.send(chords);
});

api.listen(port, function () {
  console.log('running on localhost:3000');
});
