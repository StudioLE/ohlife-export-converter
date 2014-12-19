// Node modules
var chalk = require('chalk')

// Begin module
module.exports = function(dates, entries, callback) {
	callback(null, [
		'List of entries',
		chalk.white('    node ohlife_export list'),
		'Read a specific entry',
		chalk.white('    node ohlife_export 92'),
		'Export the entries to either individual txt files or enex (change in config.js)',
		chalk.white('    node ohlife_export export'),
		'Check the validity of the file',
		chalk.white('    node ohlife_export debug')
	])
}