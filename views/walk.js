var html = require('choo/html')
var container = require('../components/container-site')
var Timeline = require('../components/timeline')
var timeline = new Timeline()

module.exports = container(view)

function view (state, emit) {
  var page = state.content['17-11-18']
  emit(state.events.DOMTITLECHANGE, 'Walking')
  return html`
    <div>
      ${timeline.render(page)}
    </div>
  `
}
