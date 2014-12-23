// Begin module
module.exports = function(callback) {
	callback(null, [
		'List of entries',
		['    node ohlife_export list'],
		'Read a specific entry',
		['    node ohlife_export 92'],
		'Export the entries to either individual txt files or enex for Evernote',
		['    node ohlife_export export txt'],
		['    node ohlife_export export enex'],
		'Check the validity of the file',
		['    node ohlife_export debug']
	])
}