// Node modules
var chalk = require('chalk')

// App modules
var config = require('../config')
var util = require('./util')

// Begin module
module.exports = function(callback) {
	callback(null, [
		'<hr>',
		chalk.cyan('OhLife_Export ') + '- Read and convert OhLife export files',
		'<hr>',
		chalk.magenta('OhLife file: ') + config.file,
		chalk.magenta('Export directory: ') + config.export_directory,
		chalk.magenta('Export format: ') + util.export_format(),
		'<hr>'
	])
}