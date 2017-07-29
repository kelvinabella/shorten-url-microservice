var mongodb = require('mongodb')

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient

// Connection URL. This is where your mongodb server is running.
// SET MONGOLAB_URI=mongodb://kelvinabella:password@ds125053.mlab.com:25053/freecodecamp
var url = process.env.MONGOLAB_URI


exports.index = function(req, res){
  res.render('index')
}

exports.retrieveUrl = function (req, res) {

  let url = console.log(req.url.slice(1))

  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err)
  } else {
    console.log('Connection established to', url);

    db.collection('inventory').insertOne({
      item: "canvas",
      qty: 100,
      tags: ["cotton"],
      size: { h: 28, w: 35.5, uom: "cm" }
    })
    .then(function(result) {
      // process result
    })

    //Close connection
    db.close();
  }
});

  res.send(req.toString())
}

exports.noRoute = function (req, res) {
 res.json({"error":"This url is not on the database."})
}
