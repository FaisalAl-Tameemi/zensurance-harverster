'use strict';

const fs = require('fs');
const sass = require('node-sass');

const sassToCSS = (source, destination, _done) => {
	sass.render({
	  file: __dirname + '/../sass/' + source,
	  outputStyle: 'compressed'
	}, (err, result) => {
		if(err){ return _done(err); }
		// create the CSS output file
		const output_file = __dirname + '/../public/stylesheets/' + destination;
		fs.writeFile(output_file, result.css, _done);
	});
}

module.exports = {
	sassToCSS
};
