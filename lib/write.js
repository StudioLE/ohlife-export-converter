// Core modules
var fs = require('fs')

// Node modules
var sqwk = require('sqwk')

// App modules
var config = require('../config')

// Begin module
module.exports = function(path, data, callback) {
	if(config.write) {
		// Write the file
		fs.writeFile(path, data, function(err) {
			if(err) callback(err)
			if(config.log) sqwk.send([['Created file:', path]])
			callback(null)
		})
	}
	else {
		if(config.log) sqwk.send([['Writing disabled:', path]])
		callback(null)
	}
}