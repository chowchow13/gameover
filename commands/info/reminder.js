const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const config = require("../../config.json");

module.exports = {
    name: "reminder",
    category: "info",
    description: "Dùng để nhắc nhở một việc gì đó",
    usage: "reminder [thời gian (5s,15m,1h,2d)] [nội dung]",
    run: async(client, message, args) => {
        let reminderTime = args[0];
        message.delete({timeout:5000});
        if (!reminderTime) return message.reply("Hãy ghi thêm thời gian vào nào !")
        let reminder = args.slice(1).join(" ");

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Nhắc nhở của ${message.author.username} đã được tạo !`)
            .addField("Lời nhắc", `${reminder}`)
            .addField("Thời gian", `${reminderTime}`)
            .setTimestamp()
        message.channel.send(embed).then(m => m.delete({timeout: 10000}));

        setTimeout(function() {
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Nhắc nhở của ${message.author.username}`)
                .addField("Nội dung", `${reminder}`)
                .setFooter(config.credit)
                .setTimestamp();

            client.channels.cache.get(config.reminderRoom).send(`<@!${message.author.id}> bạn đã đặt một lời nhắc !`);
            client.channels.cache.get(config.reminderRoom).send(embed);
        }, ms(reminderTime));
    }
}