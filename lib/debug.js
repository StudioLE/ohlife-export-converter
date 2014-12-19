// Node modules
var chalk = require('chalk')

// Begin module
module.exports = function(dates, entries, callback) {
	callback(null, [
		chalk.white(entries.length) + ' entries were found',
		chalk.white(dates.length) + ' dates were found'
	])
}