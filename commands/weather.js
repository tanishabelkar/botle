const https = require('https')
const { weatherkey } = require('../config.json')

function getWeatherData (city) {
  const url =
    'https://api.weatherapi.com/v1/current.json?key=' +
    weatherkey +
    '&q=' +
    city +
    '&aqi=no'
  var result='', w={}
  https.get(url, function (response) {
    response.on('error', (err) => {
      console.log(err)
      result+='Could not get weather data.\n'
    })
    response.on('data', function (data) {
      w = JSON.parse(data)
      console.log('here '+w)
    })
    response.on('end', function() {
      console.log('res end')
      result+= (
        'Location: ' +
        w.location.name +
        ', ' +
        w.location.region +
        ', ' +
        w.location.country +
        '\nTemperature: ' +
        w.current.temp_c +
        '&degC\tFeels like: ' +
        w.current.feelslike_c +
        '\nCondition: ' +
        w.current.condition.text
      )
      return result
    })
  })
  
}

console.log(getWeatherData('indore'))

//module.exports = {weatherOf}