var mongodb = require('mongodb')

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient

// Connection URL. This is where your mongodb server is running.
// set env variables in .env
require('dotenv').config()

var url = process.env.MONGOLAB_URI

exports.index = function(req, res){
  res.render('index')
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
      console.log('Connection established to', url)

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
                res.send(jsonResponse)
            })
          } else {
            //short url is already in dataase
            jsonResponse = {"original_url": reqUrl,"short_url":`${req.protocol}://${req.get("host")}/${docs[0].shortUrl}`}
            //we put response here since the function above is async
            res.send(jsonResponse)
          }

        //Close connection
        db.close()
      })
    }
  })

}

exports.noRoute = function (req, res) {
 res.json({"error":"Wrong url format, make sure you have a valid protocol and real site."})
}
