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
		return [{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		},
		{
			url: '/images/icons/devices.png',
			title: 'Company 1'
		}]
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
