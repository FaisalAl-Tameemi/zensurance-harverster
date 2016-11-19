'use strict';

const express = require('express');
const router = express.Router();

/**
	'GET /' - Loads the home page
*/
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
