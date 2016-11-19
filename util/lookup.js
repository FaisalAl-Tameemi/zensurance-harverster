'use strict';

const config = require('../config');
const axios = require('axios');

// create an axios instance to make HTTP calls to full contact APIs
const fullContactClient = axios.create({
  baseURL: 'https://api.fullcontact.com/v2/',
	headers: {
		'X-FullContact-APIKey': config.full_contact_api_key
	}
});

/**
	lookup a person by their full name
*/
const nameLookup = (name, _done) => {
	fullContactClient.get('/name/normalizer.json', {
	  params: {
			q: name
		}
	})
	.then(resp => _done(null, resp))
	.catch(_done);
}

/**
	lookup a person by their email
*/
const emailLookup = (email, _done) => {
	fullContactClient.get('/person.json', {
	  params: {
			email
		}
	})
	.then(resp => _done(null, resp))
	.catch(_done);
}

/**
	lookup a company by its domain
*/
const domainLookup = (domain, _done) => {
	fullContactClient.get('/company/lookup.json', {
	  params: {
			domain
		}
	})
	.then(resp => {
		_done(null, resp)
	})
	.catch(_done);
}

module.exports = {
	nameLookup,
	emailLookup,
	domainLookup
};
