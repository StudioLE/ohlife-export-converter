// App modules
var util = require('./util')

// Begin module
module.exports = function(dates, entries, callback) {
	msgs = [
		[entries.length, ' entries were found'],
		'{hr}'
	]

	for(var i in dates) {
		msgs.push(['', i + '\t', util.human_date(new Date(dates[i]))])
	}

	callback(null, msgs)
}