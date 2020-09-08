var getJSON = require("get-json");
const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: "Checkping",
    category: "info",
    description: "Dùng để xem ping của Bot và Discord",
    run: async(client, message, args) => {
        let url = `https://srhpyqt94yxb.statuspage.io/api/v2/components.json`
        getJSON(url, async function(error, response) {
            if (error) return message.channel.send('Bot gặp lỗi trong khi ping tới máy chủ Discord')
            const msg = await message.channel.send(`🏓 Đang check ping . . .`);
            var api_json = (response.components.filter(find => find.name == "API"))
            var api_json = api_json[0]
            const embed = new MessageEmbed()
                .setDescription(`Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`)
                .addField('Discord API status: ', api_json.status)
                .setFooter(config.json)
            await msg.delete();
            message.channel.send(embed)
        })
    }
}