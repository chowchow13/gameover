const config = require("../../config.json")

module.exports = {
	name: "notiall",
	aliases: ["noti"],
    category: "info",
    description: "Gửi tin nhắn riêng cho một người nào đó bằng bot !",
    usage: "dmmember [tag/id member]",

	run: (client, message, args) => {

        if (message.author.id !== config.adminId) return message.channel.send("Bạn không có đủ quyền để sử dụng lệnh này !");
        let text = args.slice(0).join(" ");
        message.guild.members.cache.forEach(member => {
            if (member.id != client.user.id && !member.user.bot) member.send(text);
        });

    }
}