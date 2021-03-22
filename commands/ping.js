module.exports = {
    name: 'ping',
    async execute(bot, message, args) {
        message.channel.send(`Pong !`)
    }
}