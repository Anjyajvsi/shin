const { MessageType } = require('@adiwajshing/baileys')
const PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  await conn.sendMessage(m.chat, {
    contacts: [{
    "displayName": "Shinichi",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Shinichi\nitem1.TEL;waid=6281937563993:6281937563993\nitem1.X-ABLabel:📍 Creator Shinchi\nitem2.EMAIL;type=INTERNET:kylueskyanjay@gmail.com\nitem2.X-ABLabel:💌 Email\nitem3.URL:https://youtu.be/met5xuoNjJM/\nitem3.X-ABLabel:📮 Rest Api\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:🌍 Provinsi | Jawa Timur\nitem5.X-ABLabel:──────[ Kediri ]──────\nEND:VCARD"
  }, {
    "displayName": "Key",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Key\nitem1.TEL;waid=6285808936396:6285808936396\nitem1.X-ABLabel:📍 Jomblo Enjoyers Dek\nitem2.EMAIL;type=INTERNET:kylueskyanjay@gmail.com\nitem2.X-ABLabel:💌 Email\nitem3.URL:https://youtu.be/met5xuoNjJM/\nitem3.X-ABLabel:⚙️ Rest Api\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:🌍 Provinsi | jawa Timur\nitem5.X-ABLabel:────[ Pare ]────\nEND:VCARD"
    }]
  }, MessageType.contactsArray, { quoted: m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(creator)$/i

module.exports = handler
