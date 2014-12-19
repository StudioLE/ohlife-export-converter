// Node modules
var chalk = require('chalk')

// App modules
var util = require('./util')

// Begin module
module.exports = function(id, dates, entries, callback) {
	if(id > dates.length - 1) {
		callback('No entry with id ' + id)
	}
	else {
		callback(null, [
			id + '\t' + chalk.white(util.human_date(
				new Date(dates[id]
			))),
			'<hr>',
			chalk.white(entries[id].trim())
		])
	}
}