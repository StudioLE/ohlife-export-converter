// Core modules
var fs = require('fs')

// App Modules
var config = require('./config')
var out = require('./lib/out')
var title = require('./lib/title')
var help = require('./lib/help')
var open = require('./lib/open')

// Send application title block to console
title(function(err, messages) {
	out.send(messages)
})

// If no operation given then print help messages
if(config.operation == undefined) {
	help(function(err, messages) {
		out.send(messages)
	})
}
// If the oh_life.txt file exists then open it
else if(fs.existsSync(config.file)) {
	open(config.file, config.operation, function(err, messages) {
		if(err) {
			out.error(err, true)
		}
		else {
			out.send(messages)
		}
	})
}
// If we can't find the file then 
else {
	out.error(['Could not locate OhLife file', config.file])
}