#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var srt = require('srt')
var arg0 = process.argv[2]
var files
if (fs.statSync(arg0).isDirectory()) {
  files = fs.readdirSync(arg0)
    .filter(file => /\.srt$/.test(file))
    .map(file => path.join(arg0, file))
} else {
  files = process.argv.slice(2)
}

files.forEach(file => {
  var out = process.argv[3] || file.replace(/\.srt$/, '.txt')
    srt(file, function (err, data) {
    var i = 0
    var lines = []
    while (++i) {
      var line = data[i]
      if (!line) break

      lines.push(line.text)
    }

    fs.writeFile(out, lines.join(' '))
  })
})
