const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'embed',
    async execute(bot, message, args) {
        const embed = new MessageEmbed()
            .setTitle(`Subscribe !`)
            .setDescription(`Make sure to subscribe to Nothing and like, share !!`)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
}