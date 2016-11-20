$(document).ready(() => {

	const GMAPS_KEY = 'AIzaSyBXL5gk6l0klvqofTyj4ES2MZx8_kDVXyE';
	const GMAPS_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

	/**
		given an address, the function below builds an ajax request and
		sets up the query params.

		@return: a promise
	*/
	const geoCode = (address) => {
		return $.ajax({
			method: 'GET',
			url: GMAPS_URL,
			data: {
				key: GMAPS_KEY,
				address: address
			}
		});
	}

	/**
		Generates HTML for a loading spinner
		@params:
			- color of spinner
			- size of spinner
	*/
	const generatePreloader = (color, size, placeholder_id) => {
		// build the loading spinner html
		const source = $('#preloader-template').html();
		const template = Handlebars.compile(source)({
			color,
			size
		});
		return $(template).css({'float': 'left'}).html();
	}

	/**
		A fn generator that handles when a user clicks next on the form.
		@return: a function to be used as an event listener
	*/
	const handleHarvesterNext = (harvester) => {
		return (e) => {
			e.preventDefault();
			switch(harvester._step){
				case 1:
					// show the loading spinner besides the next button
					const step_footer = $(`#${harvester._form_id} #step-${harvester._step} .step-footer`);
					const preloader = generatePreloader('green', 'small');
					step_footer.append(preloader);
					// submit the first 3 pieces of info + move onto to step 2,
					// then load the map using results of step 1 submission
					harvester.submitBasicInfo((err, lookup_resp) => {
						// remove the preloader from the DOM
						step_footer.find($('.preloader-wrapper')).remove();
						// if there's an error, stop
						if(err){
							return false;
						}
						// show comapny location map if available
						try{
							const address = lookup_resp.domainLookup.organization.contactInfo.addresses[0];
							const street = address.addressLine1 ? address.addressLine1 : '';
							// populate the company address field
							harvester.setFieldValue(
								'company_address',
								`${street}, ${address.locality}, ${address.country.name}`
							);
							// Geocode the address to a lat and long using gMaps API
							const map = $("#form-map");
							geoCode(`${street}, ${address.locality}`)
								.then(geo_resp => {
									const location = geo_resp.results[0].geometry.location;
									map.googleMap({
										zoom: 15, // Initial zoom level (optional)
										coords: [location.lat, location.lng], // Map center
									});
									map.addMarker({
							      coords: [location.lat, location.lng], // Map center
							      // url: lookup_resp.website, // Link to redirect onclick (optional)
							    });
								})
								.catch(err => {
									throw Error('Failed to geocode company address');
								});
						}catch(e){
							console.error('Failed to load form map on first try', e);
						}
					});
					break;
				case 2:
					// TODO: update the already made harvester submission
					// return harvester.updateSubmission({
					//
					// })
					break;
				default:
					harvester.nextStep();
			}
		}
	}

	// If someone clicks the `Get Started` cta button, start the form
	$('#start-harvester').on('click', () => {
		// build the form html
		const source = $('#harvester-template').html();
		const template = Handlebars.compile(source);
		$('#content').append(template());

		// build a new instance of the Harvester form
		const harvester = new Harvester('harvester');
		harvester._max_steps = harvester.countSteps();

		// next step listener (using class because there are multiple buttons)
		$('#harvester .zn-next').on('click', handleHarvesterNext(harvester));

		// close button listener
		$('#harvester #zn-close').on('click', (e) => {
			e.preventDefault();
			harvester.reset();
		});
	});

});
