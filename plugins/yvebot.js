let { MessageType } = require('@adiwajshing/baileys')
let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
  
let handler = async (m, { conn }) => {
let caption = `*HALO Bang*\n*Saya Shinichi 真一 - BOT*\n*Pilih Menu Di Bawah Yaa Bree*\n*Spam = Banned*\n*Telp = Blok*\n\n*Join Group WhatsApp*\nhttps://chat.whatsapp.com/D0YLdQdIjyaAAHh21whLh4\n\n*Untuk Melihat Menu Bot Ketik .menu Atau .Shinichi 真一 - BOT*`.trim()
conn.send3Button(m.chat, caption, `Powered By Baileys\nCreated Shinichi 真一 - BOT By AxellXd\n`.trim(), '🧾Menu', '.menu', '🍭Owner Shinichi 真一 - BOT', '.owner', '📖Info Bot', '.infobot', m)
}

handler.command = /^(hel)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.register = false

handler.fail = null
handler.exp = 20

module.exports = handler