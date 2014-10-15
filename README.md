ohlife-export-converter
=======================

A Node.js command line utility to convert the single .txt file exported from OhLife into either an .enex file for importing to Evernote or individual .txt files.

### Usage
Count the number of entries:

`node ohlife_export.js ohlife_file.txt`

Read a specific number (starts at 0):

`node ohlife_export.js ohlife_file.txt 92`

Export the entries to individual .txt files:

`node ohlife_export.js ohlife_file.txt export`

Export the entries to a single .enex file for Evernote:

`node ohlife_export.js ohlife_file.txt export enex`




