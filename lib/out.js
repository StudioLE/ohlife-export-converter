// Node Modules
var chalk = require('chalk')

module.exports = {

	// The array to store our logs in
	log: [],

	// Add a line to the log or array of lines to the log
	ln: function(message) {
		if(Array.isArray(message)) {
			this.log = this.log.concat(message)
		}
		else {
			this.log.push(message)
		}
		
	},

	// Add a horizontal rule to the log
	hr: function (num) {
		num = 60;
		var hr = ''
		for(var i = 0; i < num; i ++) {
			hr = hr + '-'
		}
		return hr
	},

	// Clear the log
	clear: function() {
		this.log = []
	},

	// Send the log to the console and clear log
	send: function(message) {
		if(message) {
			this.ln(message)
		}
		for(var i in this.log) {
			console.log(chalk.gray(this.log[i]))
		}
		this.clear()
	}

}