const moment = require('moment');
require("moment-duration-format");
let sunucuayar = require("../models/sunucuayar");
const client = global.client;
let conf = client.ayarlar;

module.exports = async client => {
  try {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

    client.user.setStatus("idle");

    let kanal = client.channels.cache.filter(x => x.type === 2 && x.id === client.ayarlar.botSesID); // 2 is for voice channels

    setInterval(() => {
      const oynuyor = client.ayarlar.readyFooter;
      const index = Math.floor(Math.random() * oynuyor.length);
      client.user.setActivity(`${oynuyor[index]}`, { type: "WATCHING" });

      kanal.forEach(channel => {
        if (channel.id === client.ayarlar.botSesID) {
          if (channel.members.some(member => member.id === client.user.id)) return;
          if (!client.channels.cache.get(client.ayarlar.botSesID)) return;

          client.channels.cache.get(channel.id).join()
            .then(() => console.log("Bot başarılı bir şekilde ses kanalına bağlandı"))
            .catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı. Lütfen yetkileri kontrol ediniz!"));
        } else return;
      });
    }, 10000);

  } catch (err) {
    console.error(err);
  }
};
