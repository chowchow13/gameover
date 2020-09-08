const { MessageEmbed } = require("discord.js");
const { readdirSync } = require('fs')
const { stripIndents } = require("common-tags");
const config = require("../../config.json");
var prefix = config.prefix;

module.exports = {
    name: "Ch939103",
    aliases: ["Ch939103"],
    category: "info",
    description: "Dùng để xem lệnh và công dụng của lệnh !",
    usage: "help",
    run: async(client, message, args) => {
        const category_list = readdirSync("./commands/")
        if (!args[0]) {
            return getAll(client, message);
        } else if (category_list.indexOf(args[0]) > -1) {
            return getCategory(client, message, args[0])
        } else {
            return getCMD(client, message, args[0]);
        }
    }
}

function getCategory(client, message, input) {
    var adminUser = message.guild.members.cache.get(config.adminId);
    const embed = new MessageEmbed()
        .setColor(0xffff4d)
        .setAuthor(`${adminUser.user.username}#${adminUser.user.discriminator}`,`${adminUser.user.avatarURL()}`)
        .addField("**Cách xem công dụng các lệnh**", `**\`${prefix} help [lệnh]\`**`)
        .setTitle(`Tất cả các lệnh !`)
        .setFooter(config.credit)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(" | ");
    }
    const capfirstletter = input.charAt(0).toUpperCase() + input.slice(1)
    const info = stripIndents(`**${capfirstletter}**\n${commands(input)}`)
    return message.channel.send(embed.setDescription(info));
}

function getAll(client, message) {
    var adminUser = message.guild.members.cache.get(config.adminId);
    const embed = new MessageEmbed()
        .setColor(0xffb3ff)
        .setAuthor(`${adminUser.user.username}#${adminUser.user.discriminator}`,`${adminUser.user.avatarURL()}`)
        .addField("**Cách xem công dụng các lệnh**", `**\`${prefix} help [lệnh]\`**`)
        .setTitle("Tất cả các lệnh của BOT !")
        .setFooter(config.credit)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(" | ");
    }
    const info = client.categories
        .map(cat => stripIndents `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Lệnh bạn đang tìm kiếm **${input.toLowerCase()}** không khả dụng !\nXin hãy thử lại.`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info).setFooter(config.credit));
    }

    if (cmd.name) info = `**Lệnh chính**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Lệnh phụ**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Chức năng**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Cách dùng**: ${prefix}${cmd.usage}`;
        embed.setFooter(config.credit);
    }
    if (cmd.note) info += `\n**Note**: ${cmd.note}`;

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}