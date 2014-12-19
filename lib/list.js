// Node modules
var chalk = require('chalk')

// App modules
var util = require('./util')

// Begin module
module.exports = function(dates, entries, callback) {
	msgs = [
		chalk.white(entries.length) + ' entries were found',
		'<hr>'
	]

	for(var i in dates) {
		msgs.push(i + '\t' + chalk.white(util.human_date(
			new Date(dates[i])
		)))
	}

	callback(null, msgs)
}