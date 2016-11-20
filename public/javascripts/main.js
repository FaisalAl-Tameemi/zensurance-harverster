$(document).ready(() => {

	// If someone clicks the `Get Started` cta button, start the form
	$('#start-harvester').on('click', () => {
		// build the form html
		const source = $('#harvester-template').html();
		const template = Handlebars.compile(source);
		$('#content').append(template());

		// build a new instance of the Harvester form
		const harvester = new Harvester('harvester');
		harvester._max_steps = harvester.countSteps();

		// next step listener
		$('#zn-next').on('click', (e) => {
			e.preventDefault();
			if(harvester._step === 1){
				return harvester
					.submitBasicInfo(() => {
						// TODO: show comapny location map if available
						// const map = new GMaps({
						// 	el: '#form-map'
						// });
						// GMaps.geocode({
						// 	address: '46 Spadina Avenue, Toronto',
						// 	callback: function(results, status) {
						// 		if (status == 'OK') {
						// 			var latlng = results[0].geometry.location;
						// 			map.setCenter(latlng.lat(), latlng.lng());
						// 			map.addMarker({
						// 				lat: latlng.lat(),
						// 				lng: latlng.lng()
						// 			});
						// 		}
						// 	}
						// });
						return false;
					});
			}
			harvester.nextStep();
		});

		// close button listener
		$('#zn-close').on('click', (e) => {
			e.preventDefault();
			harvester.reset();
		});
	});

});
