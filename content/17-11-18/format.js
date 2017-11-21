var data = require('./data.json')
var path = require('path')

data.photos = data.photos.map(function (photo) {
  delete photo.image.thumb
  delete photo.image.square
  delete photo.image.display
  photo.image.large.url = path.join('/content/17-11-18', path.basename(photo.image.large.url))
  photo.image.original.url = path.join('/content/17-11-18', path.basename(photo.image.original.url))
  return photo
})

console.log(JSON.stringify(data, { }, 2))
