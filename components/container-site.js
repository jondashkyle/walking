var html = require('choo/html')

module.exports = container

function container (view) {
  return function content (state, emit) {
    return html`
      <body class="ff-mono bgc-white fc-black">
        ${view(state, emit)}
      </body>
    `
  }
}
