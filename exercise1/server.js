const express = require('express');
const hbs = require ('hbs');

var app = express();

const yargs = require('yargs');

const distance = require('./distance/distance');

const geocode = require('./geocode/geocode');



app.get('/api/geo', function(req, res) {
  var lat = req.param('lat');
  var lng = req.param('lng');

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
        //console.log(JSON.stringify(results, undefined, 2));
        res.setHeader('Content-Type', 'application/json');
        res.send(results);
      }
    });
  
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/api/distance', (req, res) => {
  var lat1 = req.param('lat1');
  var lng1 = req.param('lng1');
  var lat2 = req.param('lat2');
  var lng2 = req.param('lng2');
  var dis = distance.getDistance(1.1,1.2, 5, 50);
  res.send(`distance: ${dis}`);
});

// app.get('/about', (req, res) => {
//   res.render('about.hbs', {
//     pageTitle: 'About Page',
//     currentYear: new Date().getFullYear()
//   });
// });

// // /bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'Unable to handle request'
//   });
// });

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
