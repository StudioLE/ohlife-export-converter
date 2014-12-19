// Core modules
var fs = require('fs')

// App modules
var config = require('../config')
var out = require('./out')

// Begin module
module.exports = function(path, data, callback) {
	if(config.write) {
		// Write the file
		fs.writeFile(path, data, function(err) {
			if(err) callback(err)
			if(config.log) out.send('Data written to: ' + path)
			callback(null)
		})
	}
	else {
		if(config.log) out.send('Writing disabled: ' + path)
	}
	callback(null)
}