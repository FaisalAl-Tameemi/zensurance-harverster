'use strict';

module.exports = (app, db) => {

	// Loads the home page
	app.get('/', function(req, res, next) {
	  res.render('index');
	});

};
