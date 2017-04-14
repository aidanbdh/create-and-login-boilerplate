const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '..', '/public')))
app.use(bodyParser.json())

const profiles = [{ email: 'test@test.info', name: 'test' }]

app.get('/', (req, res) => {
  res.status(200).send('index.html')
})

app.post('/login', (req, res) => {
  let profile
  profiles.forEach(value => {
    if(value.email == req.body.email) profile = value
  })
  profile
    ? res.status(200).send(profile)
    : res.status(401).send()
})

module.exports = app
