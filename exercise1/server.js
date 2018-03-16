const express = require('express');
const hbs = require ('hbs');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var app = express();

const distance = require('./distance/distance');

const geocode = require('./geocode/geocode');


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/geocode', function(req, res) {
  
  res.render('geocode.hbs', {
    pageTitle: 'Geocode'
  });  
  
});
app.post('/geocode/result', urlencodedParser, function (req, res){
  var lat = req.body.lat;
  var lng = req.body.lng;
  var location = {
      lat:lat,
      lng:lng
  };
  console.log(location);
  geocode.geocodeAddress(location, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
        res.send(errorMessage);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(results);
      }
    }); 
 });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page'
  });
});

app.get('/api/distance', (req, res) => {
  var lat1 = req.query.lat1;
  var lng1 = req.query.lng1;
  var lat2 = req.query.lat2;
  var lng2 = req.query.lng2;
  var dis = distance.getDistance(lat1,lng1, lat2, lng2);
  res.setHeader('Content-Type', 'application/json');
  res.send({"distance(km)": dis});
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
