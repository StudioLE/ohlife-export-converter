// Node modules
var chalk = require('chalk')

module.exports = {

	// The array to store our logs in
	log: [],

	// Add a line to the log or array of lines to the log
	ln: function(message) {
		if(Array.isArray(message)) {
			for(var i in message) {
				if(Array.isArray(message[i])) {
					this.add_array(message[i])
				}
				else {
					this.add(message[i])
				}
			}
			//this.log = this.log.concat(message)
		}
		else {
			this.add(message)
		}
	},

	zebra: function(message, style) {
		// If the message is an array join with a zebra color effect
		// red grey red grey etc
		if(Array.isArray(message)) {
			for(var i in message) {
				if(i % 2 == 0) {
					message[i] = chalk[style](message[i])
				}
			}
			message = message.join(' ')
		}
		else {
			message = chalk[style](message)
		}
		this.ln(message)
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

	// Parse the message and then add it to the log array
	add: function(message) {
		if(message == '<hr>' || message == '{hr}') {
			message = this.hr()
		}
		this.log.push(message)
	},

	// Parse a zebra array and add it to the log
	add_array: function(message) {
		if(this.styles[message[0]] == undefined) {
			color = 'white'
		}
		else {
			color = this.styles[message.shift()]
		}
		this.zebra(message, color)
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
		// If the message is an array join with a zebra color effect
		// red grey red grey etc
		this.zebra(message, 'red')
		this.send()
		if(exit) process.exit()
	},

	styles: {
		'{bold}': 'bold',
		'{dim}': 'dim',
		'{italic}': 'italic',
		'{underline}': 'underline',
		'{inverse}': 'inverse',
		'{hidden}': 'hidden',
		'{strikethrough}': 'strikethrough',

		'{black}': 'black',
		'{red}': 'red',
		'{green}': 'green',
		'{yellow}': 'yellow',
		'{blue}': 'blue',
		'{magenta}': 'magenta',
		'{cyan}': 'cyan',
		'{white}': 'white',
		'{gray}': 'gray',

		'{bgBlack}': 'bgBlack',
		'{bgRed}': 'bgRed',
		'{bgGreen}': 'bgGreen',
		'{bgYellow}': 'bgYellow',
		'{bgBlue}': 'bgBlue',
		'{bgMagenta}': 'bgMagenta',
		'{bgCyan}': 'bgCyan',
		'{bgWhite}': 'bgWhite'
	}, 

}