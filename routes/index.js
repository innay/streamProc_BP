'use strict';
let express = require('express');
let router = express.Router();
let _ = require('lodash');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });

});

router.get('/eventsCount', (req, res) => {
  let oEventsCounter = {};
  _.times(localStorage.length, (i) => {
    oEventsCounter[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i))).eventCounter || 0;
  })
  res.send(oEventsCounter);
});

router.get('/wordsCount', (req, res) => {
  let oWordsCounter = {};
  _.times(localStorage.length, (i) => {
    oWordsCounter[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i))).wordsCount || {};
  })
  res.send(oWordsCounter);
});

module.exports = router;
