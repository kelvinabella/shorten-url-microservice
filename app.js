const express = require('express')
const app = express()

var options = { beautify: true }

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine(options))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.get('/', require('./routes').index)

app.get(/(http(s)?:\/\/)?((\w+\.){1,})([a-z]{2,3})((\/\w+){1,})?$/, require('./routes').retrieveUrl)

app.get('*', require('./routes').noRoute)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

