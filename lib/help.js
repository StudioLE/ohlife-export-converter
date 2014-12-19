// Node modules
var chalk = require('chalk')

// Begin module
module.exports = function(callback) {
	callback(null, [
		'List of entries',
		chalk.white('    node ohlife_export list'),
		'Read a specific entry',
		chalk.white('    node ohlife_export 92'),
		'Export the entries to either individual txt files or enex for Evernote',
		chalk.white('    node ohlife_export export txt'),
		chalk.white('    node ohlife_export export enex'),
		'Check the validity of the file',
		chalk.white('    node ohlife_export debug')
	])
}