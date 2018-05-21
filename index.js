const express = require('express')
const axios = require('axios')

const app = express()

const festival = {
  name: 'Austin City Limits',
  date: new Date(),
  location: { city: 'Austin', state: 'Tx', country: 'United States'},
  imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/22/ACL-Logo.jpg',
  href: 'https://localhost:3000/api/festivals/austin-city-limits',
  lineup: []
}

const artist = {
  name: 'Paul McCartney',
  imgSrc: 'https://i.scdn.co/image/cc1f9a3f3c93481439ff6bfb97048cfd41e4e575',
  popularity: 75,
  festivals: [Object.assign({}, festival)]
}

const artistCopy = Object.assign({}, artist)
delete artistCopy.festivals  
for (let i=0; i<50; i++) {
  festival.lineup.push(artistCopy)
}


let festivals = []
let festivalPrevs = []
for (let i=0; i<25; i++) {
  festivals.push(festival)
  festivalPrevs.push({
    name: festival.name,
    imgSrc: festival.imgSrc,
    href: festival.href
  })
}

app.get('/api/festivals', (req, res) => res.send(festivalPrevs))

app.get('/api/festivals/austin-city-limits', (req, res) => res.send(festival))

app.get('/api/artists/:name', async (req, res) => {
  const { name } = req.params
  const artist = await axios('http://localhost:3001/artists/' + name).then(r => r.data)
  console.log('artist: ', artist)
  res.send(artist)
})

app.listen(3000, () => console.log('listening on port 3000'))
