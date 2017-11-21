var gr8 = require('gr8')
var config = require('./config')

var utils = [ ]

utils.push({
  prop: { fc: 'color' },
  join: '-',
  vals: config.colors
})

utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: config.colors
})

utils.push({
  prop: 'font-family',
  join: '-',
  vals: config.typography
})

module.exports = gr8({
  breakpointSelector: 'class',
  responsive: true,
  utils: utils
})
