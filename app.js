'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config'); // config file
const sassUtil = require('./util/sass'); // sass to css utility helper
const MongoClient = require('mongodb').MongoClient;
const asyncParallel = require('async/parallel');

// create an express app instance
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// setup the necessary ExpressJS middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// a function to connect to the database
const connectToMongo = (_done) => {
	MongoClient.connect(config.mongo_uri, (err, db) => {
		// if there's an error while connecting to the database
		if(err){
			// stop the server from running
			throw Error('Failed to connect to mongo database');
		}
		// require and add all the router files
		require('./routes')(app, db);
		// invoke the callback, pass on the db instance
		_done(null, db);
	});
}

// a function to compile SASS files into a single public css file
const compileSass = (_done) => {
	// note: core.scss requires all the other sass files
	sassUtil.sassToCSS('core.scss', 'style.css', (err) => {
		if(err){
			// throw error, stop the server from running
			throw Error('Failed to convert SASS to CSS');
		}
		console.log('SASS files have been converted to CSS');
		// invoke the callback, no need to return any data
		_done(null);
	});
}

// Run the sass compile and db connection in parallel
asyncParallel({
	sass: compileSass,
	db_conn: connectToMongo
}, (err, results) => { // results --> { sass: null, db_conn: ... }
	// start listening to server requests
	app.listen(config.port, () => {
		console.log(`Express is now listening on port ${config.port}`);
	});
});

// uncomment below to export the entire express app
// module.exports = app;
