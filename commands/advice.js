const https = require('https')

function getAdvice (commands) {
  var url = 'https://api.adviceslip.com/advice',
    advice = ''
  if (commands[1]) {
    url += '/search/' + commands[1]
  }
  https.get(url, function (res) {
    if (res.statusCode === 200) {
      res.on('data', function (data) {
        const ad = JSON.parse(data)
        if (ad.slip) {
          advice+=(ad.slip.advice)
        } else {
          const ind = Math.floor(Math.random() * ad.slips.length)
          console.log(ind)
          advice+=(ad.slips[ind].advice)
        }
      })
    }
  })
  return advice;
}
module.exports = {getAdvice}