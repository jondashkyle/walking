var objectKeys = require('object-keys')
var html = require('choo/html')
var md = require('nano-markdown')
var raw = require('bel/raw')
var path = require('path')
var fs = require('fs')

var content = fs.readFileSync(path.join(__dirname, '../content/index.txt'), 'utf8')
var container = require('../components/container-site')

module.exports = container(view)

function view (state, emit) {
  return html`
    <div class="p1 sm-p2 lh1-5 ff-sans">
      <div class="copy">
        ${raw(md(content))}
      </div>
    </div>
  `
}
