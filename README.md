# OhLife Export Converter

Read and convert OhLife export files to Evernote or individual .txt files

When OhLife closed down unexpectedly in 2014 users were provided with just a single `.txt` file command comintaing all their journal entries. 

This node.js command line utility can convert the export file into either:

- an `.enex` file for importing to Evernote or
- individual `.txt` files

### Config

Configuration options are available in `./config.js`

### Usage

- Help

`node ohlife_export`

- List all entries and their ids:

`node ohlife_export list`

- Read a specific entry (starts at 0):

`node ohlife_export 92`

- Export the entries to either individual `.txt` files or `.enex` for Evernote

`node ohlife_export export txt`
`node ohlife_export export enex`

- Check the validity of the file:

`node ohlife_export debug`


### Methodology

The script splits the entries between the date stamps using the regex: `/\d{4}-\d{2}-\d{2}/g`

The txt export option uses the entry date for the file name.

The Evernote export option sets the title as a human friendly date string and sets the note created date to the entry date.
