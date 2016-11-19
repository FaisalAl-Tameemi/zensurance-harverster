'use strict';

const axios = require('axios');

/**
	description: validate that a certain domain is real by making a GET request to it
*/
const checkDomain = (domain, _done) => {
	axios
		.get(`http://${domain}`)
		.then(resp => {
			return _done(null, resp);
		})
		.catch(_done);
}

module.exports = {
	checkDomain
};
