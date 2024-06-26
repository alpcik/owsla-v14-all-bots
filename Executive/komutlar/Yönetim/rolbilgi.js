const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) || durum) {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!args[0]) return message.reply("Rol bilgisine bakmak istediğin rolü belirt ve tekrar dene !");
        if (!role) return message.reply("Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene.");
        let sayı = role.members.size;
        if (sayı > 200) return message.channel.send(`${role} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`);
        let üyeler = role.members.map(x => `<@${x.id}> - (\`${x.id}\`) `);
        message.channel.send(`- ${role} rol bilgileri;
- Rol ID: \`${role.id}\`
- Rol Kişi Sayısı: \`${sayı}\`
─────────────────
- Roldeki Kişiler: 
${üyeler.join("\n")}
`, { split: true });
    } else {
        return;
    }
};

exports.conf = {
    aliases: ["rolbilgi"]
};

exports.help = {
    name: 'Rolbilgi'
};
