$(document).ready(() => {

	/**
		Generates a random number within a range
	*/
	const randomBetween = (min, max, floor = true) => {
		const _temp = Math.random() * (max - min + 1);
		if(floor){
				return Math.floor(_temp) + min;
		}else{
			return _temp + min;
		}
	}

	const loadIcons = () => {
		return _.shuffle([{
			url: 'https://cl.ly/1E1T2z1R290A/Image%202016-11-20%20at%205.13.04%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3c3h2O1g402E/Image%202016-11-20%20at%205.14.20%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/043v1Z2l1D0N/Image%202016-11-20%20at%205.14.10%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/0G0e1V2k2h1G/Image%202016-11-20%20at%205.13.49%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/2a2z0s020y1Y/Image%202016-11-20%20at%205.13.44%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3f203O292J0u/Image%202016-11-20%20at%205.13.33%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3D3k090J0B1n/Image%202016-11-20%20at%205.13.29%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/1E1T2z1R290A/Image%202016-11-20%20at%205.13.04%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3c3h2O1g402E/Image%202016-11-20%20at%205.14.20%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/043v1Z2l1D0N/Image%202016-11-20%20at%205.14.10%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/0G0e1V2k2h1G/Image%202016-11-20%20at%205.13.49%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/2a2z0s020y1Y/Image%202016-11-20%20at%205.13.44%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3f203O292J0u/Image%202016-11-20%20at%205.13.33%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3D3k090J0B1n/Image%202016-11-20%20at%205.13.29%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/1E1T2z1R290A/Image%202016-11-20%20at%205.13.04%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3c3h2O1g402E/Image%202016-11-20%20at%205.14.20%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/043v1Z2l1D0N/Image%202016-11-20%20at%205.14.10%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/0G0e1V2k2h1G/Image%202016-11-20%20at%205.13.49%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/2a2z0s020y1Y/Image%202016-11-20%20at%205.13.44%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3f203O292J0u/Image%202016-11-20%20at%205.13.33%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/2a2z0s020y1Y/Image%202016-11-20%20at%205.13.44%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3f203O292J0u/Image%202016-11-20%20at%205.13.33%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3D3k090J0B1n/Image%202016-11-20%20at%205.13.29%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3D3k090J0B1n/Image%202016-11-20%20at%205.13.29%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/1E1T2z1R290A/Image%202016-11-20%20at%205.13.04%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/3c3h2O1g402E/Image%202016-11-20%20at%205.14.20%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/043v1Z2l1D0N/Image%202016-11-20%20at%205.14.10%20PM.png',
			title: 'Company 1'
		},
		{
			url: 'https://cl.ly/0G0e1V2k2h1G/Image%202016-11-20%20at%205.13.49%20PM.png',
			title: 'Company 1'
		}]);
	}

	/**
		Builds the HTML needed for all the floating icons
	*/
	const buildIcons = (icons) => {
		const source = $('#floating-icon-template').html();
		const template = Handlebars.compile(source);
		return icons.map((img, i) => {
			// generate the random image sizing
			sizes = [56, 72, 72, 96, 128];
			$('#floating-icons').append(template({
				url: img.url,
				tooltip: img.title,
				dimension: sizes[randomBetween(0, sizes.length - 1)],
				margin_t: randomBetween(-20, 35),
				margin_b: randomBetween(-20, 25),
				margin_r: randomBetween(35, 45),
				margin_l: randomBetween(35, 45),
				random_s: randomBetween(1, 4, false)
			}));
		});
	}

	$('#floating-icons').append(buildIcons(loadIcons()));

});
