module.exports = {

	// ---------------------------------------
	// Custom settings
	// ---------------------------------------

	// Path to ohlife file `example.txt`
	file: 'example.txt',

	// Export to directory
	export_directory: 'export',
	
	// Default export format `txt` or `enex`
	// node ohlife_export export
	format: 'txt',

	// Prefix txt exports with the date
	prefix_date: true,

	// ---------------------------------------
	// Development settings
	// ---------------------------------------
	
	// Which operation to perform
	operation: process.argv[2],

	// Write files
	write: true,

	// Detailed write logs
	log: false,
	
	// The RegEx to split posts by
	regex: /\d{4}-\d{2}-\d{2}/g

}