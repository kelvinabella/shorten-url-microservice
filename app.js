const express = require('express')
const app = express()

var options = { beautify: true }

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine(options))

app.get('/', require('./routes').index)

app.get('/:id(*)', (req, res) => {

  let param = req.params.id
  let regex = /^(\/)?(http(s)?\:\/\/)?((\w+\.){1,})([a-z]{2,3})(\:\d+)?((\/\w+){1,})?(?:\/(?=$))?$/ig

  if(regex.test(param)) {
    require('./routes').retrieveUrl(req, res)
  } else if (/\w{5}/ig.test(param)) {
    require('./routes').redirectLink(req, res)
  } else {
    require('./routes').noRoute(req, res)
  }

})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

