# OhLife Export Converter

Read and convert OhLife export files to Evernote or individual .txt files

When OhLife closed down unexpectedly in 2014 users were provided with just a single .txt file command comintaing all their journal entries. 

This node.js command line utility can convert the export file into either:

- an .enex file for importing to Evernote or
- individual .txt files.

### Config

Configuration options are available in `./config.js`

### Usage

- Count the number of entries:

`node ohlife_export`

- Read a specific number (starts at 0):

`node ohlife_export 92`

- List the dates of each entry:

`node ohlife_export dates`

- Export the entries to either individual txt files or enex (change in /config.js)

`node ohlife_export export`


### Methodology

The script splits the entries between the date stamps using the regex: `/\d{4}-\d{2}-\d{2}/g`

The txt export option uses the entry date for the file name.

The Evernote export option sets the title as a human friendly date string and sets the note created date to the entry date.
