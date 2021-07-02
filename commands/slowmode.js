const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'slowmode',
    description: "Set channel's slowmode",
    usage: 'slowmode [Second]',
    async execute(bot, message, args) {
        let number = args[0]
        if(!number) return message.channel.send("Please provide new slowmode and it is a number. Provide \`none\` if you want to remove");
        if(!Number(number) && number !== "none") return message.channel.send(`${number} is not a number. Provide \`none\` if you want to remove`);
        if(number == "none") number = 0
        if(number > 21600) return message.channel.send("Slowmode can't be higher than 6 hours");
        if(message.channel.rateLimitPerUser === number) return message.channel.send(`Slowmode for this channel is ${number} seconds already`);
        await message.channel.setRateLimitPerUser(number)
            .then(message.channel.send(new MessageEmbed()
                .setTitle("Channel Updated")
                .setColor("GREEN")
                .setDescription(`Slowmode Updated: **${number} seconds**\nAction by: **${message.author.tag}**`)
            ))
            .catch(err => {
                message.channel.send(new MessageEmbed()
                    .setTitle("Error")
                    .setDescription(`\`\`\`yaml\n${err}\`\`\``)
                    .setColor("RED")
                )
            })
    }
}