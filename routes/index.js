var mongodb = require('mongodb')

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient

// Connection URL. This is where your mongodb server is running.
// set env variables in .env
require('dotenv').config()

var url = process.env.MONGOLAB_URI

exports.index = function(req, res){
  res.render('index', {host: `${req.protocol}://${req.get("host")}`})
}

exports.retrieveUrl = function (req, res) {

  //get url prams
  let reqUrl = req.url.slice(1)

  //create random string
  let randStr = Math.random().toString(36).substr(2, 5)

  let jsonResponse = {}

  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err)
    } else {
      console.log('Retrieve: Connection established')

      let collection = db.collection("urls")

      collection.find({ "url": reqUrl }).toArray((err, docs) => {

          if (docs.length === 0) {
            collection.insertOne(
              {
                "url": reqUrl,
                "shortUrl": randStr
              },
              function(err, r) {
                if (err) {
                  //unique constraint in random string.
                  jsonResponse = {"error": "Please refresh the page and try again."}
                }else {
                  //insertion to document success
                  jsonResponse = {"original_url": reqUrl,"short_url":`${req.protocol}://${req.get("host")}/${randStr}`}
                }
                //we put response here since the function above is async
                res.json(jsonResponse)
            })
          } else {
            //short url is already in dataase
            jsonResponse = {"original_url": reqUrl,"short_url":`${req.protocol}://${req.get("host")}/${docs[0].shortUrl}`}
            //we put response here since the function above is async
            res.json(jsonResponse)
          }

        //Close connection
        db.close()
      })
    }
  })

}

exports.redirectLink = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err)
    } else {
      console.log('Redirect: Connection established')

      let collection = db.collection("urls")

      collection.find({ "shortUrl": req.params.id }).toArray((err, docs) => {

          if (docs.length !== 0) {

            let rUrl = docs[0].url
            //redirects to selected url
            res.redirect(rUrl.includes("http")? rUrl : `${req.protocol}://${rUrl}`)
          } else {
            //we put response here since the function above is async
            res.json({"error":"This url is not on the database."})
          }

        //Close connection
        db.close()
      })
    }
  })
}

exports.noRoute = function (req, res, next) {
 res.status(404).json({"error":"Wrong url format, make sure you have a valid protocol and real site."})
}
