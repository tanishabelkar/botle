const { SlashCommandBuilder } = require('@discordjs/builders')
const {REST} = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')

const commands = [
  new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Gives random advice on any topic you might want.'),
  new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Gives the weather information of the requested city.'),
  new SlashCommandBuilder()
    .setName('wordle')
    .setDescription(
      'Play the wordle game as much as you like, for as long as you like.'
    )
].map(command => command.toJSON())

const rest = new REST().setToken(token)

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)
