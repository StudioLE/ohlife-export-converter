// Core modules
var fs = require('fs')
var p = require('path')

// Node modules
var chalk = require('chalk')

// App modules
var config = require('../config')
var out = require('./out')
var util = require('./util')
var write_file = require('./write')

// Begin module
module.exports = function(dates, entries, callback) {

	// Which export format
	var format = util.export_format();

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
		var entry_date = util.human_date(d)

		var content = ''
		
		// Format the output
		if(config.prefix_date) {
			content = entry_date
		}
		
		content += '\n\n' + entries[i].trim()

		if(format == 'txt') {
			var path = p.join(dir, dates[i] + '.' + format)
			write_file(path, content, function(err) {
				
			})
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

		write_file(path, output, function(err) {
			callback(err)
		})

	} // if enex
	
	if(config.write) {
		out.send(chalk.white('Exporting to directory ') + config.export_directory)
	}
	else {
		out.send('Writing disabled in config')
	}

	callback(null)
	
}