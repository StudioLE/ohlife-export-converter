
// Config

var prefix_date = false
var default_format = 'txt'
var regex = /\d{4}-\d{2}-\d{2}/g

// Fetch args

var file = process.argv[2] //'ohlife_20141014.txt'
var operation = process.argv[3]
var format = process.argv[4] // 'txt' or 'enex'

// Dev config

var write = true
var log = true

// Script

var fs = require('fs')
var p = require('path')

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


if(file != undefined) {
	read_ohlife(file, operation)
}
else {
	console.log('You must specify at least the OhLife filename. For example:')
	console.log('node ohlife_export.js ohlife_file.txt')
	console.log('node ohlife_export.js ohlife_file.txt 92')
	console.log('node ohlife_export.js ohlife_file.txt export')
	console.log('node ohlife_export.js ohlife_file.txt export enex')
}


function read_ohlife(file, operation) {
	fs.readFile(file, 'utf-8', function(err, data) {
		if (err) throw err
		var entries = data.split(regex).slice(1)
		var dates = data.match(regex)
		
		console.log(entries.length + ' entries were found')
		console.log(dates.length + ' dates were found')
		
		if(operation != undefined) {
			if(IsNumeric(operation)) {
				output_entry(operation, dates, entries)
			}
			else if(operation == 'export') {
				export_files(dates, entries)
			}
			else if(operation == 'dates') {
				output_dates(dates, entries)
			}
			else {
				console.log('Invalid command')
			}
		}

	})
}


function output_entry(id, dates, entries) {
	if(id > dates.length - 1) {
		console.log('No entry found with id: ' + id)
	}
	else {
		// Format the date
		var d = new Date(dates[id])
		var entry_date = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
		console.log(dates[id])
		console.log(entry_date)
		console.log(entries[id].trim())
	}
}

function output_dates (dates, entries) {
	for(var i in dates) {
		var d = new Date(dates[i])
		var entry_date = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
		console.log(entry_date)
	}
}


function export_files(dates, entries) {

	// Format the date for the output directory
	var out_d = new Date()
	var out_t = [
		out_d.getFullYear(),out_d.getMonth()+1,out_d.getDate(),out_d.getHours(),out_d.getMinutes(),out_d.getSeconds()
	].join('-')

	// If format is not specified in the command line use default
	if(format == undefined) {
		format = default_format
	}

	if(format == 'txt' && write) {
		// Create a directory for the output
		fs.mkdirSync(out_t)
		console.log('Created directory: ' + out_t)
	}
	
	if(format == 'enex') {
		var enex = []
	}

	// Run through every entry
	for(var i in entries) {
		// Format the date
		var d = new Date(dates[i])
		var entry_date = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()

		var content = ''
		
		// Format the output
		if(prefix_date) {
			content = entry_date
		}
		
		content += '\n\n' + entries[i].trim()

		if(format == 'txt') {
			var path = out_t + p.sep + dates[i] + '.' + format
			write_file(path, content)
		}
		else if(format == 'enex') {
			var enex_date = d.toJSON().replace(/-|:|\.\d{3}/gm, '')
			content = content.replace(/(\r\n\r\n|\n\n|\r\r)/gm,'</div><div><br/></div><div>')
			content = content.replace(/&/g, '&amp;')
			enex.push('<note><title>' + entry_date + '</title><content><![CDATA[<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note><div>' + content + '</div></en-note>]]></content><created>' + enex_date + '</created></note>\n\n')
		}
	} // for

	if(format == 'enex') {
		var enex_date = out_d.toJSON().replace(/-|:|\.\d{3}/gm, '')
		var output = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-export SYSTEM "http://xml.evernote.com/pub/evernote-export2.dtd"><en-export export-date="' + enex_date + '" application="Evernote/Windows" version="4.x">'
		
		for(var i in enex) {
			output += enex[i]
		}

		output += '</en-export>'

		var path = 'OhLife_Export_' + out_t + '.' + format

		write_file(path, output)

	} // if enex

	console.log('Complete')
}


function write_file(path, data) {
	if(write) {
		// Write the file
		fs.writeFile(path, data, function(err) {
			if(err) throw err
			if(log) console.log('Data written to: ' + path)
		})
	}
	else {
		if(log) console.log('Writing disabled: ' + path)
	}
}


function IsNumeric(data) {
	return ( ! isNaN(data) && (data % 1) === 0)
}
