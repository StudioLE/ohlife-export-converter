// App modules
config = require('../config')

// Begin module
module.exports = {

	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

	is_num: function (data) {
		return ( ! isNaN(data) && (data % 1) === 0)
	},

	human_date: function(d) {
		// Nov 1, 2012
		//return this.months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()

		// Monday Jul 18, 2011
		return this.days[d.getDay()] + ' ' + this.months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
	},

	machine_date: function(d) {
		return [
			d.getFullYear(),
			d.getMonth()+1,
			d.getDate(),
			d.getHours(),
			d.getMinutes(),
			d.getSeconds()
		].join('-')
	},

	export_format: function () {
		// Determine which export format to
		if(process.argv[3] != undefined) {
			return process.argv[3]
		}
		else {
			return config.format
		}
	}
}