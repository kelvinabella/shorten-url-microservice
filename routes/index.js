var mongodb = require('mongodb')

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient

// Connection URL. This is where your mongodb server is running.
var url = process.env.MONGOLAB_URI


exports.index = function(req, res){
  res.render('index')
}

exports.retrieveUrl = function (req, res) {

  let reqUrl = req.url.slice(1)
  let urlNotFound = false
  let randNum = Math.round(Math.random()*10000)
  let jsonResponse = {}
  let shortUrlNotFound = false

  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err)
  } else {
    console.log('Connection established to', url)
    let collection = db.collection("urls")

    collection.find({ "url": reqUrl }).toArray((err, docs) => {
      urlNotFound = docs.length === 0 ? true : false


      collection.find({ "shortUrl": randNum }).toArray((err, docs1) => {
        shortUrlNotFound = docs1.length === 0 ? true : false

        if (urlNotFound) {
          if (shortUrlNotFound) {
            collection.insertOne(
              {
                "url": reqUrl,
                "shortUrl": randNum
              },
              function(err, r) {
                if (err) {
                  throw Error ("Cannot insert document")
                }
                console.log(r.ops)
                jsonResponse = {"original_url": reqUrl,"short_url":`${req.protocol}://${req.get("host")}/${randNum}`}
                res.json(jsonResponse)
            })
          }
        } else {
          jsonResponse = {"original_url": reqUrl,"short_url":`${req.protocol}://${req.get("host")}/${docs[0].shortUrl}`}
          res.send(jsonResponse)
        }

      //Close connection
      db.close()
      })
    })
  }
});


}

exports.noRoute = function (req, res) {
 res.json({"error":"This url is not on the database."})
}
