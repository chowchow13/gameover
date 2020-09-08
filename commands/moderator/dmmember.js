const config = require("../../config.json")

module.exports = {
	name: "dmmember",
	aliases: ["dmmember"],
    category: "info",
    description: "Gửi tin nhắn riêng cho một người nào đó bằng bot !",
    usage: "dmmember [tag/id member]",

	run: (client, message, args) => {
		if (message.author.id !== config.adminId) return message.channel.send(`Lệnh này chỉ dành riêng cho ${config.author}`);
		let mUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!mUser) return message.channel.send("Tag tên người cần gửi hoặc điền id người đó trước !");
            let messagecontent = args.slice(1).join(" ");
            if (!messagecontent) return message.channel.send("Nhập tin nhắn cần gửi");

            let private = client.users.cache.get(mUser.id);
            if (!private) {
                message.channel.send("Không thể tìm thấy người dùng !");
                return;
            } else {
            	private.send(messagecontent).catch(O_o => console.log({O_o}));
           }
    }
}