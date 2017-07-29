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

var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

app.get(regex, require('./routes').retrieveUrl)

app.get('*', require('./routes').noRoute)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

