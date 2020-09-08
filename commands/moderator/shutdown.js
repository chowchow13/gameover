const config = require("../../config.json");

module.exports = {
    name: "shutdown",
    aliases: ["sd", "shutdown"],
    category: "moderation",
    description: "Dùng để tắt bot từ xa",
    usage: "shutdown",
    note: `Lệnh dành riêng cho ${config.author}`,
    run: async(client, message, args) => {
        if (message.author.id !== config.adminId) return message.channel.send(`Lệnh này dành riêng cho ${config.author}`);

        try {
            await message.channel.send("Bye bye mọi người :wink:")
            process.exit()
        } catch (e) {
            message.channel.send(`Bot lỗi: ${e.message}`)
        }
    }
}