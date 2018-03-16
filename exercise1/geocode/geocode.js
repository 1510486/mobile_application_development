const request = require('request');

var geocodeAddress = (address, callback) => {
  var lat = address.lat;
  var lng = address.lng;
  var key = "AIzaSyCVxLFsmJmyyL6D_QKkAZlQl0QqY1AX7Ck";
  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
