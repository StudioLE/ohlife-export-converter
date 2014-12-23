// App modules
var util = require('./util')

// Begin module
module.exports = function(id, dates, entries, callback) {
	if(id > dates.length - 1) {
		callback(['No entry with id:', id])
	}
	else {
		callback(null, [
			['', id + '\t', util.human_date(new Date(dates[id]))],
			'{hr}',
			[entries[id].trim()]
		])
	}
}