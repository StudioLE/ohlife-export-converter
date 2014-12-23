// Begin module
module.exports = function(dates, entries, callback) {
	callback(null, [
		[entries.length, 'entries were found'],
		[dates.length, 'dates were found']
	])
}