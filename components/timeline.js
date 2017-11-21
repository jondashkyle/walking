var Nanocomponent = require('nanocomponent')
var xtend = require('xtend')
var html = require('choo/html')
var css = require('sheetify')
var xhr = require('xhr')

var style = css`
  .line { height: 1px; background: #000; transition: transform 1s linear; }
  .photo { width: 33.3% }
  .photo:hover { z-index: 2; }
  .blink {
    animation: blink 500ms steps(1, end) infinite;
  }

  @keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
  }
`

module.exports = class Timeline extends Nanocomponent {
  constructor () {
    super()

    this.state = {
      photos: [ ],
      start: '2017-11-18T20:00:00.216Z',
      end: '2017-11-19T02:00:00.216Z',
      heightHour: 2000,
      live: false
    }

    this.frameResize = undefined
    this.frameRefresh = undefined
    this.frameScroll = undefined

    this.dimensions = this.dimensions.bind(this)
    this.refresh = this.refresh.bind(this)
    this.scroll = this.scroll.bind(this)
    this.resize = this.resize.bind(this)
  }

  resize () {
    var self = this
    clearTimeout(this.frameResize)
    this.frameResize = setTimeout(this.dimensions, 250)
  }

  dimensions () {
    this.state.heightHour = window.innerWidth * 2.5
    this.rerender()
  }

  load () {
    this.refresh()
    this.dimensions()
    this.frameRefresh = setInterval(this.refresh, 1000)
    this.frameScroll = setInterval(this.scroll, (60 / this.state.heightHour) * 60 * 1000)
    window.addEventListener('resize', this.resize, false)
  }

  unload () {
    clearInterval(this.frameRefresh)
    clearInterval(this.frameScroll)
    window.removeEventListener('resize', this.resize, false)
  }

  refresh () {
    var self = this
    if (!this.state.api) {
      self.rerender()
      return
    } else {
      xhr(this.state.api + '?' + new Date().getTime() / 1000, function (err, resp) {
        if (err) throw err
        this.state.photos = JSON.parse(resp.body, { }, 2)
        self.rerender()
      })
    }
  }

  scroll () {
    window.scrollTo(0, window.scrollY + 1)
  }

  createElement (props) {
    this.state = xtend(this.state, props)
    var self = this

    var dateNow = new Date()
    var dateStart = new Date(this.state.start)
    var dateEnd = new Date(this.state.end)
    var datePosition = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds())

    var timeStart = dateStart.getTime() / 1000
    var timeEnd = dateEnd.getTime() / 1000
    var timePosition = datePosition.getTime() / 1000
    var startHour = new Date(this.state.start).getHours()

    var hours = (timeEnd - timeStart) / (1000 * 60 * 60) * 1000
    var height = hours * this.state.heightHour
    var positionNow = ((timePosition - timeStart) / (timeEnd - timeStart) * hours) * self.state.heightHour

    if (datePosition < dateStart || datePosition > dateEnd) {
      return html`
        <div class="vhmn100 w100 x xjc xac ff-sans">
          Next cycle begins at ${dateStart.getHours()}:00PST
        </div>
      `
    }

    return html`
      <div class="psr w100 z1 ${style}" style="height: ${height}px">
        <div class="psf b0 l0 pen p1 ff-mono ttu ${this.state.live ? 'blink' : ''}">
          ${this.state.live ? 'LIVE' : 'PLAYBACK'}
        </div>
        <div class="w100 pen psr z2">
          ${Array(hours).fill(null).map(function (hour, i) {
            return html`
              <div
                class="ff-mono ttu psr"
                style="height: ${self.state.heightHour}px"
              >
                <div class="x">
                  <div class="bgc-black fc-white p1 lh1">${i + startHour}:00pst</div>
                </div>
                ${i > 0 ? html`<div class="psa t0 l0 c12 line"></div>` : ''}
                <div class="psa l0 c1 line" style="top: 25%"></div>
                <div class="psa l0 c1 line" style="top: 50%"></div>
                <div class="psa l0 c1 line" style="top: 75%"></div>
              </div>
            `
          })}
        </div>
        <div class="psa line t0 l0 r0 pen z2" style="background: #f33; transform: translate3d(0, ${positionNow}px, 0);"></div>
        ${this.state.photos.map(function (entry) {
          var dateEntry = new Date(entry.created_at)
          if (!entry.image) return
          if (dateEntry > datePosition) return
          var timeEntry = dateEntry.getTime() / 1000
          var positionY = ((timeEntry - timeStart) / (timeEnd - timeStart) * hours) * self.state.heightHour
          var positionX = (dateEntry.getSeconds() / 60) * 66.6

          return html`
            <div
              class="psa photo pen"
              style="top: ${positionY}px; left: ${positionX}%"
            >
              <a href="${entry.image.original.url}" rel="noopener noreferrer" target="_blank" class="pea"><img src="${entry.image.large.url}" class="c12"></a>
              <div class="pt1 ff-sans">${entry.title}</div>
            </div>
          `
        })}
      </div>
    `
  }

  update (props) {
    return props.id !== this.state.id
  }

  renderPlaceholder () {
  }
}
