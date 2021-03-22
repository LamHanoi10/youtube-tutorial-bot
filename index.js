const Discord = require('discord.js')
const bot = new Discord.Client()
const { token, prefix } = require('./config.json')
const fs = require('fs')

bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith(`.js`))

bot.on('ready', () => {
    console.log(`${bot.user.tag} Online !`)
})

for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command)
}

bot.on('message', async message => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    if(!bot.commands.has(command)) return;
    try{
        bot.commands.get(command).execute(bot, message, args)
    }catch(e) {
        console.log(e)
    }
})

bot.login(token)