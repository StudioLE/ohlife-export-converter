// App modules
var config = require('../config')
var util = require('./util')

// Begin module
module.exports = function(callback) {
	callback(null, [
		'{hr}',
		['{cyan}', 'OhLife_Export', '- Read and convert OhLife export files'],
		'{hr}',
		['{magenta}', 'OhLife file:', config.file],
		['{magenta}', 'Export directory:', config.export_directory],
		['{magenta}', 'Export format:', util.export_format()],
		'{hr}'
	])
}