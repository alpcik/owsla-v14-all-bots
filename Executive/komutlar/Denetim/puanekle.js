const xpData = require("../../models/stafxp");
const sunucuayar = require("../../models/sunucuayar");

module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

    if (durum) {
        const sec = args[0];
        const data = await sunucuayar.findOne({ guildID: message.guild.id });

        if (sec === "user") {
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz.");
            if (!args[2]) return message.reply("Lütfen bir puan ekleyiniz");
            if (args[2] > 250 && !data.GKV.includes(message.author.id)) return message.reply("250 üzeri puan ekleyemezsin.");

            await xpData.updateOne({ userID: target.id }, { $inc: { currentXP: Number(args[2]) } }, { upsert: true }).exec();
            message.channel.send(`Başarılı bir şekilde ${target} adlı üyeye ${args[2]} puan eklediniz.`);
        }

        if (sec === "rol") {
            const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            if (!rol) return message.reply("Lütfen bir rol etiketleyiniz.");
            if (!args[2]) return message.reply("Lütfen bir puan ekleyiniz");
            if (args[2] > 250 && !data.GKV.includes(message.author.id)) return message.reply("250 üzeri puan ekleyemezsin.");

            rol.members.forEach(async target => {
                await xpData.updateOne({ userID: target.id }, { $inc: { currentXP: Number(args[2]) } }, { upsert: true }).exec();
            });
            message.channel.send(`Başarılı bir şekilde ${rol.members.size} üyeye ${args[2]} puan eklediniz.`);
        }
    } else return;
};

exports.conf = {
    aliases: ["bonus"]
};

exports.help = {
    name: 'puanekle'
};
