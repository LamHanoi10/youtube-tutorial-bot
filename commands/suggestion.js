const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'suggestion',
    description: "Suggests something",
    usage: 'suggestion [Query]',
    async execute(bot, message, args) {
        const query = args.join(" ")
        if(!query) return message.channel.send(`You must send a query to suggest \`+suggestion [Query]\``)
        const channel = bot.channels.cache.get('829392512241238016') || bot.channels.cache.find(c => c.name == 'suggestion')
        if(!channel) return message.channel.send(`Cannot find suggestion channel. Make sure the server has a channel called \`suggestion\``)
        channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**${query}**`)
            .setColor(`RANDOM`)
            .setFooter(`New Suggestion`)
        )
        if(channel.id == message.channel.id) return message.delete()
        message.channel.send(`**:white_check_mark: Suggestion Recored**`)
    }
}