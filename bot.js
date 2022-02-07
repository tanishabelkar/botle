const { Client, Intents, Interaction } = require('discord.js')
const { token } = require('./config.json')
const wordle = require('./wordle.js')

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
})

client.once('ready', () => {
  console.log(client.user.toString() + ' is ready')
  console.log(client.guilds)
})

let a = 0

client.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith('*')) return
  const commands = msg.content.split(' ')
  commands[0] = commands[0].substring(1)
  console.log(commands)
  if (commands[0] === 'wordle') {
    if(commands[1]>7 && commands[1]<3) {
      msg.channel.send('Please enter a number between 3 and 7, both included.')
      return
    }
    wordle.createGame(parseInt(commands[1]))
    msg.channel.send('Game created, start!')
  } else {
    if (wordle.checkEntry(commands[0])) {
      ++a
      if (a >= wordle.game.attempts) {
        msg.channel.send(
          'Attempts exhausted. The word is- ' + wordle.game.target
        )
        a = 0
        return
      }
      const result = wordle.move(commands[0])
      if (result.length<1) {
        msg.channel.send('You Won!!')
        a = 0
        return
      } else {
        let r = ''
        result.forEach(function (c) {
          if (c === -1) r += '⬜ '
          else if (c === 1) r += '🟩 '
          else r += '🟨 '
        })
        msg.channel.send(result + '\n' + r)
      }
    } else {
      msg.channel.send('Invalid word, try again.')
    }
  }
})

client.login(token)