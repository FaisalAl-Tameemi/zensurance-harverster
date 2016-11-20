'use strict';

const Levenshtein = require('levenshtein');
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
	.then(resp => _done(null, resp.data))
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
	.then(resp => _done(null, resp.data))
	.catch(_done);
}

const linkedinCompanyLookup = (company, _done) => {
	axios
		.get(`https://www.linkedin.com/ta/federator?query=${company}&types=company,group`)
		.then(resp => _done(null, resp.data))
		.catch(_done);
}

/**
	lookup a company by its domain
*/
const domainLookup = (domain, company, _done) => {
	// get the Levenshtein value between the comapny name and the domain name
	// remove the `.ca`/`.com`/etc.. from the domain name
	const domain_filtered = domain.split('.').slice(0, -1).join('.');
	const leven = new Levenshtein(domain_filtered, company);
	// if the Levenshtein value is close to 1, then the email is their
	// work email (assuming company name accurate)
	if(leven.distance < 7){
		fullContactClient.get('/company/lookup.json', {
		  params: {
				domain
			}
		})
		.then(resp => {
			return _done(null, resp.data);
		})
		.catch(err => {
			// if its a 404, that means the API has nothing on this email
			if(err.status === 404){
				return _done(null, null);
			}
			return _done(err);
		});
	}else{
		// otherwise, this isn't the person's work email
		// look up the company on linkedin
		linkedinCompanyLookup(company, (err, data) => {
			if(err){ return _done(err); }
			// invoke callback with linkedin search results
			_done(null, data.company.resultList.length > 0 ? data.company.resultList[0] : null);
		});
	}
}

module.exports = {
	nameLookup,
	emailLookup,
	domainLookup
};
