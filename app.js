'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config'); // config file
const sassUtil = require('./util/sass'); // sass to css utility helper

// create an express app instance
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// compile SASS files into a single public css file
// note: core.scss requires all the other sass files
sassUtil.sassToCSS('core.scss', 'style.css', (err) => {
	if(err){
		return console.log('Failed to convert SASS to CSS', err);
	}
	console.log('SASS files have been converted to CSS');
});

// require and add all the router files
app.use('/', require('./routes'));

// 404 not found error
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(config.port, () => {
	console.log(`Express is now listening on port ${config.port}`);
});

module.exports = app;
