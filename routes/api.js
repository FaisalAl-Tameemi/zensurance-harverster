'use strict';

const asyncParallel = require('async/parallel');
const validate = require('../util/validate');

module.exports = (app, db) => {

	/**
		description:
				validates an email by doing 2 things
		body:
				email: STRING
	*/
	app.post('/api/validate-email', (req, res) => {
		db.collection('users').findOne({
			email: req.body.email
		}, (err, user) => {
			if(err){
				return res.status(500).json(err);
			}
			// if a user exists, the email is already taken
			if(user){
				return res.status(200).json({
					is_valid: false,
					message: 'User already exists'
				});
			}
			// now that we know the email is not taken, we need to check the domain
			validate.checkDomain(req.body.email.split('@')[1], (err, response) => {
				if(err || response.status >= 400){
					return res.status(200).json({
						is_valid: false,
						message: 'Invalid domain'
					});
				}
				// if there are no errros, the domain email and domain are both valid
				return res.status(200).json({
					is_valid: true
				});
			});
		});
	});

	/**
		Creates a new inquiry
	*/
	app.post('/api/inquiries', (req, res) => {
		// TODO: implement
	});

}
