const {
  Client,
  Intents
} = require('discord.js')

const { token } = require('./config.json')
const wordle = require('./commands/wordle')

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

let attempts = 0,
  keyboard = new Array(26)

keyboard.fill(-2)

let moveEmbed = {
    color: 0xffe599,
    title: 'Move ',
    author: {
      name: 'Bot-le'
    },
    description:'You\'ll get there buddy, think harder.',
    fields: [
      {
        name: 'Your Guess',
        value: '\u200b',
        inline: false
      },
      {
        name: 'Green',
        value: '\u200b',
        inline: true
      },
      {
        name: 'Yellow',
        value: '\u200b',
        inline: true
      },
      {
        name: 'Black',
        value: '\u200b',
        inline: true
      }
    ],
    image: {
      url: 'https://c.tenor.com/gak3SqCGROIAAAAC/spongebob-think.gif',
      height: 3
    },
    timestamp: new Date()
  },
  winEmbed = {
    color: 0xb6d7a8,
    title: 'GGWP!',
    description: 'Congratulations, you know your way around words. :)',
    fields: [
      {
        name: 'Player',
        value: '\u200b',
        inline: true
      },
      {
        name: 'Number of tries',
        value: '\u200b',
        inline: true
      }
    ],
    image: {
      url: 'https://i.imgur.com/TtPCMzo.gif',
      height: 3
    },
    timestamp: new Date()
  },
  loseEmbed = {
    color: 0xe06666,
    title: 'You lost :(',
    description:
      "It's alright, you don't have to wait 24 hours for the next one here :)",
    fields: [
      {
        name: 'The word was-',
        value: '\u200b',
        inline: false
      }
    ],
    image: {
      url: 'https://c.tenor.com/Lhlq72-SMvYAAAAC/lost-the.gif',
      height: 3
    },
    timestamp: new Date()
  }

client.on('message', msg => {
  if (msg.author.bot || !msg.content.startsWith('*')) return
  msg.content.toLowerCase()
  const commands = msg.content.split(' ')
  commands[0] = commands[0].substring(1)
  console.log(commands)

  //Initialization command
  if (commands[0] === 'wordle') {
    
    //Checking validity
    if (commands.length<2 || commands[1] > 7 && commands[1] < 3) {
      msg.channel.send('Please enter a number between 3 and 7, both included.')
      return
    }

    //Initializing the game
    wordle.createGame(parseInt(commands[1]))
    attempts = 0
    keyboard.fill(-2)
    console.log(wordle.game)
    msg.channel.send('Game created, start!')
  }

  //For guesses
  else {
    if (wordle.checkEntry(commands[0])) {
      ++attempts
      const result = wordle.move(commands[0])

      //Winning Condition
      if (result.length < 1) {
        winEmbed.fields[0].value = msg.author.username.toString()
        winEmbed.fields[1].value = attempts.toString()
        msg.channel.send({ embeds: [winEmbed] })
        attempts = 0
        keyboard.fill(-2)
        return
      } else {
        //Losing Condition
        if (attempts >= wordle.game.attempts) {
          loseEmbed.fields[0].value = wordle.game.target
          msg.channel.send({ embeds: [loseEmbed] })
          attempts = 0
          keyboard.fill(-2)
          return
        }

        //Get attempt analysis
        let resString = ''
        result.forEach(function (c, i) {
          if (c === -1) {
            resString += '⬛ '
            keyboard[commands[0].charCodeAt(i)-97] = c
          } else if (c === 1) {
            resString += '🟩 '
            keyboard[commands[0].charCodeAt(i)-97] = c
          } else {
            resString += '🟨 '
            if(keyboard[commands[0].charCodeAt(i)-97]!==1)
              keyboard[commands[0].charCodeAt(i)-97] = c
          }
        })

        //Fill keyboard
        let green = [], yellow = [], black = []
        keyboard.forEach(function(key, i) {
          if(key===-1)
            black.push(String.fromCharCode(97+i))
          else if (key===0) {
            yellow.push(String.fromCharCode(97+i))
          } else if(key===1){
            green.push(String.fromCharCode(97+i))
          }
        })

        //Send attempt analysis
        moveEmbed.title += attempts.toString()
        moveEmbed.fields[0].value = resString
        if(green.length>0) moveEmbed.fields[1].value = green.join(' ')
        if(yellow.length>0) moveEmbed.fields[2].value = yellow.join(' ')
        if(black.length>0) moveEmbed.fields[3].value = black.join(' ')
        console.log(keyboard)
        msg.channel.send({ embeds: [moveEmbed] })
      }
    }

    //Invalid Guess
    else {
      msg.channel.send('Invalid word, try again.')
    }
  }
})

client.login(token)


/*Wordle 212 4/6

🟨⬛⬛⬛⬛
🟩🟩 */