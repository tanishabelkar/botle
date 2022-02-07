function toString (x) {
  if (x === 3) return 'three'
  if (x === 4) return 'four'
  if (x === 5) return 'five'
  if (x === 6) return 'six'
  if (x === 7) return 'seven'
}

var game = {}
var wordlist = [],
  data = {}

function mapWord (s) {
  let m = new Map()
  for (let i = 0; i < s.length; ++i) {
    if (m.has(s[i])) {
      m.get(s[i]).add(i)
    } else {
      m.set(s[i], new Set())
      m.get(s[i]).add(i)
    }
  }
  return m
}

function createGame (limit) {
  const path = './words/' + toString(limit) + '.json'
  data = require(path)
  wordlist = Object.keys(data)
  game.target = wordlist[Math.floor(Math.random() * wordlist.length)]
  game.attempts = game.target.length
  game.map = mapWord(game.target)
}

function checkEntry (entry) {
  if (data[entry]) return true
  else return false
}

function move (word) {
  word = word.toLowerCase()
  if (word === game.target) return []
  let wmap = mapWord(word),
    res = new Array(word.length)

  //comparing the indices of each letter in the word with those of the letters in target word
  game.map.forEach((val, key) => {
    if (wmap.has(key)) {
      const it = wmap.get(key).values()
      val.forEach(function (v) {
        if (wmap.get(key).has(v)) {
          res[v] = 1
        } else {
          res[it.next().value] = 0
        }
      })
    }
  })

  for (let i = 0; i < res.length; ++i) {
    if (res[i] !== 1 && res[i] !== 0) {
      res[i] = -1
    }
  }

  return res
}

module.exports = { createGame, move, checkEntry, game }
