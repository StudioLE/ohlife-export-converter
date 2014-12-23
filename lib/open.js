// Core modules
var fs = require('fs')

// App modules
var config = require('../config')
var util = require('./util')
var entry = require('./entry')
var list = require('./list')
var convert = require('./convert')
var debug = require('./debug')

// Begin module
module.exports = function(file, operation, callback) {
	fs.readFile(file, 'utf-8', function(err, data) {
		
		if(err) callback(err)

		var entries = data.split(config.regex).slice(1)
		var dates = data.match(config.regex)
		
		if(util.is_num(operation)) {
			entry(operation, dates, entries, function(err, messages) {
				callback(err, messages)
			})
		}
		else if(operation == 'list') {
			list(dates, entries, function(err, messages) {
				callback(err, messages)
			})
		}
		else if(operation == 'export') {
			convert(dates, entries, function(err, messages) {
				callback(err, messages)
			})
		}
		else if(operation == 'debug') {
			debug(dates, entries, function(err, messages) {
				callback(err, messages)
			})
		}
		else {
			callback('Unknown operation ' + operation)
		}

	})
}