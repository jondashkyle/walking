var objectKeys = require('object-keys')
var choo = require('choo')
var app = choo()

var content = require('./content')
require('./design')

app.route('/', require('./views/walk'))
// app.route('/', require('./views/main'))
// objectKeys(content.walks).forEach(function (walk) {
//   app.route(walk, require('./views/walk'))
// })

app.use(function (state, emitter) {
  state.content = { }
  objectKeys(content.walks).forEach(function (walk) {
    state.content[walk] = content.walks[walk]
  })
})

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

if (!module.parent) app.mount('body')
else module.exports = app
