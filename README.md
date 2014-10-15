OhLife Export Converter
=======================

A Node.js command line utility to convert the single .txt file exported from OhLife into either:

- an .enex file for importing to Evernote or
- individual .txt files.

### Usage
- Count the number of entries:

`node ohlife_export.js ohlife_file.txt`

- Read a specific number (starts at 0):

`node ohlife_export.js ohlife_file.txt 92`

- Export the entries to individual .txt files:

`node ohlife_export.js ohlife_file.txt export`

- Export the entries to a single .enex file for Evernote:

`node ohlife_export.js ohlife_file.txt export enex`


### Methodology

The script splits the entries between the date stamps using the regex: `/\d{4}-\d{2}-\d{2}/g`

The txt export option uses the entry date for the file name.

The Evernote export option sets the title as a human friendly date string and sets the note created date to the entry date.

An option to prefix each entry with the date is available within the script. Just set: `var prefix_date = true;`
