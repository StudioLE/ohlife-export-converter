// Node modules
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
		num = 60
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

	// Return logs with appended message then clear logs
	return: function(message) {
		if(message) {
			this.ln(message)
		}
		logs = []
		for(var i in this.log) {
			if(this.log[i] == '<hr>') {
				this.log[i] = this.hr()
			}
			logs.push(chalk.gray(this.log[i]))
		}
		this.clear()
		return logs
	},

	// Console.log logs with appended message then clear logs
	send: function(message) {
		logs = this.return(message)
		for(var i in logs) {
			console.log(logs[i])
		}
	},

	error: function(message, exit) {
		this.send(chalk.red(message))
		if(exit) process.exit()
	}

}