const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json")

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "report [tag/id member]",
    run: async(client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!rMember)
            return message.reply("Không thể tìm thấy người này !").then(m => m.delete({timeout: 5000}));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Bạn không thể report Mod và Admin !").then(m => m.delete({timeout: 5000}));

        if (!args[1])
            return message.channel.send("Hãy ghi lý do vì sao bạn muốn report nhé !").then(m => m.delete({timeout: 5000}));

        const channel = client.channels.cache.get(config.reportRoom)
        const admin_log = client.channels.cache.get(config.reportLogs)

        if (!channel)
            return message.channel.send("Không tìm thấy phòng report !").then(m => m.delete({timeout: 5000}));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents `**- Member:** ${rMember} (${rMember.user.id})
            **- Tag:** ${rMember.user.tag}
            **- Reported in:** ${message.channel}
            **- Reason:** ${args.slice(1).join(" ")}`);
        channel.send(embed);
        embed.addField(`Người report: `, `${message.author.tag} `)
        admin_log.send(embed)

    }
}