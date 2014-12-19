// Core Modules
var fs = require('fs')
var p = require('path')

// Node Modules
var chalk = require('chalk')

// App Modules
var config = require('./config')
var out = require('./lib/out')

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var hr = '------------------------------------------------------'

// Format the console output
out.send([
	hr,
	chalk.cyan('OhLife_Export ') + '- Read and convert OhLife export files',
	hr,
	chalk.magenta('OhLife file: ') + config.file,
	chalk.magenta('Export directory: ') + config.export_directory,
	chalk.magenta('Export format: ') + config.format,
	hr
])


if(config.operation == undefined) {
	out.send([
		'List of entries',
		chalk.white('    node ohlife_export list'),
		'Read a specific entry',
		chalk.white('    node ohlife_export 92'),
		'Export the entries to either individual txt files or enex (change in config.js)',
		chalk.white('    node ohlife_export export'),
		'Check the validity of the file',
		chalk.white('    node ohlife_export debug')
	])
	process.exit()
}
else if(fs.existsSync(config.file)) {
	read_ohlife(config.file, config.operation)
}
else {
	out.send(chalk.white('Could not locate OhLife file ') + config.file)
}


function read_ohlife(file, operation) {
	fs.readFile(file, 'utf-8', function(err, data) {
		if (err) throw err
		var entries = data.split(config.regex).slice(1)
		var dates = data.match(config.regex)
		
		
		if(IsNumeric(operation)) {
			output_entry(operation, dates, entries)
		}
		else if(operation == 'list') {
			output_dates(dates, entries)
		}
		else if(operation == 'export') {
			export_files(dates, entries)
		}
		else if(operation == 'debug') {
			out.send([
				chalk.white(entries.length) + ' entries were found',
				chalk.white(dates.length) + ' dates were found'
			])
		}
		else {
		}

	})
}


function output_entry(id, dates, entries) {
	if(id > dates.length - 1) {
		out.send(chalk.red('No entry with id ') + id)
	}
	else {
		// Format the date
		var d = new Date(dates[id])
		var entry_date = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
		out.send([
			id + '\t' + chalk.white(entry_date),
			hr,
			chalk.white(entries[id].trim())
		])
	}
}

function output_dates (dates, entries) {
	out.send([chalk.white(entries.length) + ' entries were found', hr])

	for(var i in dates) {
		var d = new Date(dates[i])
		var entry_date = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
		out.ln(i + '\t' + chalk.white(entry_date))
	}

	out.send()
}


function export_files(dates, entries) {
	
	var format = config.format

	// Format the date for the output directory
	var out_d = new Date()
	var out_t = [
		out_d.getFullYear(),out_d.getMonth()+1,out_d.getDate(),out_d.getHours(),out_d.getMinutes(),out_d.getSeconds()
	].join('-')

	var dir = p.join(config.export_directory, out_t)

	if(format == 'txt' && config.write) {
		// Create a directory for the output
		try {
			fs.mkdirSync(dir)
		} catch(err) {
			if(err.code == 'ENOENT') {
				console.error('The export directory does not exist')
				process.exit()
			}
			else {
				throw err
			}
		}
		if(config.log) out.send('Created directory: ' + dir)
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
		if(config.prefix_date) {
			content = entry_date
		}
		
		content += '\n\n' + entries[i].trim()

		if(format == 'txt') {
			var path = p.join(dir, dates[i] + '.' + format)
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

		var path = p.join(config.export_directory, 'OhLife_Export_' + out_t + '.' + format)

		write_file(path, output)

	} // if enex
	
	if(config.write) {
		out.send(chalk.white('Exporting to directory ') + config.export_directory)
	}
	else {
		out.send('Writing disabled in config')
	}
}


function write_file(path, data) {
	if(config.write) {
		// Write the file
		fs.writeFile(path, data, function(err) {
			if(err) throw err
			if(config.log) out.send('Data written to: ' + path)
		})
	}
	else {
		if(config.log) out.send('Writing disabled: ' + path)
	}
}


function IsNumeric(data) {
	return ( ! isNaN(data) && (data % 1) === 0)
}
