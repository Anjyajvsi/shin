let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let { performance } = require('perf_hooks')
let neww = Math.round(performance.now())
let old = Math.round(performance.now())
const chats = conn.chats.all()
const groups = chats.filter(v => v.jid.endsWith('g.us'))
const defaultMenu = {
  before: `

        ··────━•〔 Shinichi 真一͎ 〕•━────··

🎐 *𝙽𝙰𝙼𝙰:* %name
🎐 *𝙿𝚁𝙴𝙼𝙸𝚄𝙼:* %prems
🎐 *𝙰𝙶𝙴:* %age
🎐 *𝙻𝙸𝙼𝙸𝚃:* %limit
🎐 *𝙼𝙾𝙽𝙴𝚈:* %money
🎐 *𝚁𝙾𝙻𝙴:* %role
🎐 *𝙻𝙴𝚅𝙴𝙻:* %level [%xp4levelup]
🎐 *𝚇𝙿:* %exp / %maxexp
🎐 *𝚃𝙾𝚃𝙰𝙻 Xp:* %totalexp

                   *〔 llı 𝚃𝙾𝙳𝙰𝚈 ıll 〕*

🎐 *${ucapan()} %name!*
🎐 *𝚃𝙰𝙽𝙶𝙶𝙰𝙻:* %week %weton, %date
🎐 *𝚃𝙰𝙽𝙶𝙶𝙰𝙻 𝙸𝚂𝙻𝙰𝙼:* %dateIslamic
🎐 *𝚃𝙸𝙼𝙴:* %time

                    *〔 llı 𝙸𝙽𝙵𝙾 ıll 〕*      

🎐 *𝙽𝙰𝙼𝙰 𝙱𝙾𝚃:* %me
🎐 *𝙼𝙾𝙳𝙴:* ${global.opts['self'] ? 'Private' : 'Publik'}
🎐 *𝙿𝚁𝙴𝙵𝙸𝚇:* [ Multi Prefix ]
🎐 *𝚂𝙿𝙴𝙴𝙳:* ${neww - old} ms
🎐 *𝙱𝙰𝚃𝚃𝙴𝚁𝚈 𝙱𝙾𝚃:* ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
🎐 *𝚄𝙿𝚃𝙸𝙼𝙴:* %uptime (%muptime)
🎐 *𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴:* %rtotalreg dari %totalreg

          *〔 llı 𝙸𝙽𝙵𝙾 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 ıll 〕*     

*Ⓟ* = 𝙿𝚁𝙴𝙼𝙸𝚄𝙼
*Ⓛ* = 𝙻𝙸𝙼𝙸𝚃

%readmore`.trimStart(),
  header: '*╭────━•〔 %category 〕•━────┐*',
  body: '│ ⸙͎۪۫ %cmd %islimit %isPremium',
  footer: '*╰──────────━⃝┅⃝━────────┘*',
  after: `⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕.
     %me
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let bzz = './audio/robot.m4a'
	let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'sound', 'vn', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner', 'gift', 'thnks']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'Epic Rpg',
    'xp': 'Exp & Limit',
    'fun': 'Fun',
    'jodoh': 'Jodoh',
    'gift': 'Gift',
    'anime': 'Anime',
    'hentai': `NSFW`,
    'premium': 'Premium',
    'anonymous': 'Anonymous Chat',
    'kerang': 'Kerang Ajaib',
    'sound': 'Sound Music',
    'vn': 'Vn Imuet',
    'quotes': 'Quotes',
    'absen': 'Absen',
    'vote': 'Voting',
    'admin': `Admin`,
    'group': 'Grup',
    'news': 'News',
    'internet': 'Internet',
    'edukasi': 'Edukasi',
    'quran': 'Islam',
    'image': 'Random Image',
    'sticker': 'Stiker',
    'nulis': 'MagerNulis & Logo',
    'audio': 'Pengubah Suara',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'database': 'Database',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
    'thnks': 'THANKS TO',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'NSFW',
    'nsfw': 'HENTAI',
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
if (teks == 'sound') tags = {
    'sound': 'Sound Music'
  }
if (teks == 'vn') tags = {
    'vn': 'Vn Imuet'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun',
    'jodoh': 'Jodoh'
  }
  if (teks == 'jodoh') tags = {
    'jodoh': 'Jodoh'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'gift') tags = {
    'gift': 'Gift'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'thnks') tags = {
    'thnks': 'THANKS TO'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { money, age, exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let premium = global.db.data.users[m.sender].premium
    let prems = `${premium ? 'Yes': 'No'}`
    let wm = global.botwm
    let logo = global.logo
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `*───────[ 𝙳𝙰𝚂𝙷𝙱𝙾𝙰𝚁𝙳 ]───────*`.trim(),
          "description": `${ucapan()}, ${name} !`.trim(),
          "footerText": `「 *Bσt Ɩnfσrmαtισn* 」
🌸 𝙰𝙺𝚃𝙸𝙵 𝚂𝙴𝙻𝙰𝙼𝙰 ${uptime}
🌸 𝙱𝙰𝚃𝙴𝚁𝙰𝙸 ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
🌸 𝙿𝚁𝙴𝙵𝙸𝚇 : [Multi Prefix]
🌸 *${Object.keys(global.db.data.users).length}* Pengguna
🌸 *${totaljadibot.length}* Jadibot
🌸 *${conn.blocklist.length}* Terblock
🌸 *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
🌸 *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned

         🗓️ ${week}, ${date}`,
          "buttonText": "Click Here!",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": "📊 › 𐐪-〚 𝚂𝚃𝙰𝚃𝚄𝚂 〛-𐑂",
                                         "description": "𝚂𝚃𝙰𝚃𝚄𝚂 Shinichi 真一 - BOT",
                                         "rowId": ".botstat"
                                    }, {
                                         "title": "⚡› 𐐪-〚 𝚂𝙿𝙴𝙴𝙳 〛-𐑂",
                                         "description": "𝙼𝙴𝙽𝙰𝙼𝙿𝙸𝙻𝙺𝙰𝙽 𝙺𝙴𝙲𝙴𝙿𝙰𝚃𝙰𝙽 𝚁𝙴𝚂𝙿𝙾𝙽 Shinichi 真一 - BOT",
                                         "rowId": ".ping"
                                    }, {
                                         "title": "🗒️› 𐐪-〚 𝙸𝙽𝙵𝙾 〛-𐑂",
                                         "description": "𝙼𝙴𝙽𝙰𝙼𝙿𝙸𝙻𝙺𝙰𝙽 𝙸𝙽𝙵𝙾 Shinichi 真一 - BOT",
                                         "rowId": ".info"
                                    }, {
                                         "title": "🎐 › 𐐪-〚 𝙲𝚁𝙴𝙰𝚃𝙾𝚁 〛-𐑂",
                                         "description": "𝙺𝙾𝙽𝚃𝙰𝙺 𝙲𝚁𝙴𝙰𝚃𝙾𝚁 𝙺𝚄 ^~^",
                                         "rowId": ".owner"
                                    }, {
                                         "title": "❗ › 𐐪-〚 𝚁𝚄𝙻𝙴𝚂 〛-𐑂",
                                         "description": "𝙿𝙰𝚃𝚄𝙷𝙸 𝚁𝚄𝙻𝙴𝚂 𝚄𝙽𝚃𝚄𝙺 𝙺𝙴𝙽𝚈𝙰𝙼𝙰𝙽𝙰𝙽 𝙱𝙴𝚁𝚂𝙰𝙼𝙰",
                                         "rowId": ".rules"
                                    }, {
                                         "title": "🪙 › 𐐪- 〚 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 〛 -𐑂",
                                         "description": "𝙲𝙴𝙺 𝙿𝙾𝚂𝙸𝚂𝙸𝙼𝚄",
                                         "rowId": ".lb"  
                                    }, {
                                         "title": "💌 › 𐐪-〚 𝙶𝚁𝙾𝚄𝙿 𝙱𝙾𝚃 〛-𐑂",
                                         "description": "𝙹𝙾𝙸𝙽 𝙺𝙴 𝙶𝚁𝙾𝚄𝙿 𝙾𝙵𝙵𝙸𝙲𝙸𝙰𝙻 Shinichi 真一",
                                         "rowId": ".gcbot" 
                                    }, {
                                         "title": "🦄 › 𐐪-〚 𝙶𝚁𝙾𝚄𝙿 𝚂𝙴𝚃𝚃𝙸𝙽𝙶 〛-𐑂",
                                         "description": "𝚂𝙴𝚃𝚃𝙸𝙽𝙶 𝙶𝚁𝙾𝚄𝙿",
                                         "rowId": ".setelangrub" 
                                     }, {
                                         "title": "🤖 › 𐐪-〚 𝙱𝙾𝚃 𝚂𝙴𝚃𝚃𝙸𝙽𝙶 〛-𐑂",
                                         "description": "𝙾𝚆𝙽𝙴𝚁 𝙾𝙽𝙻𝚈",
                                         "rowId": ".botsett" 

      }],
                    "title": " 𝚂𝚃𝙰𝚃𝚄𝚂 "
                }, {
                  "rows": [{
                  "title": "💬 〉ɞ 『 𝚂𝙴𝙼𝚄𝙰 𝙿𝙴𝙿𝚁𝙸𝙽𝚃𝙰𝙷 』",
                  "description": "𝙼𝙴𝙼𝙱𝙴𝚁𝙸𝙺𝙰𝙽 𝚂𝙴𝙼𝚄𝙰 𝙵𝙸𝚃𝚄𝙴 Shinichi 真一 - BOT",
                  "rowId": ".? all"
                }, {
                  "title": "🎮 〉ɞ 『 𝙶𝙰𝙼𝙴 』",
                  "description": "𝙶𝙰𝙼𝙴𝙽𝚈𝙰 𝚂𝙴𝚁𝚄 𝙺𝙰𝙺 >\\<...",
                  "rowId": ".? game"
                }, {
                  "title": "🌱 〉ɞ 『 𝚁𝙿𝙶 』",
                  "description": "𝙶𝙰𝙼𝙴 𝙴𝙿𝙸𝙲 𝚁𝙿𝙶 ! ",
                  "rowId": ".? rpg"
                }, {
                  "title": "📈 〉ɞ 『 𝙴𝚇𝙿 & 𝙻𝙸𝙼𝙸𝚃 』",
                  "description": "𝙰𝚈𝙾 𝚃𝙸𝙽𝙶𝙺𝙰𝚃𝙺𝙰𝙽 𝙻𝙴𝚅𝙴𝙻𝙼𝚄..!",
                  "rowId": ".? xp"
                }, {
                  "title": "🧩 〉ɞ 『 𝙵𝚄𝙽 』",
                  "description": "𝚂𝙰𝙽𝙶𝙰𝚃 𝙵𝙰𝙼𝙸𝙻𝚈 𝙵𝚁𝙸𝙴𝙽𝙳𝙻𝚈...",
                  "rowId": ".? fun"
                }, {
                  "title": "🎁 〉ɞ 『 𝙶𝙸𝙵𝚃 』",
                  "description": "𝚂𝚄𝚁𝙿𝚁𝙸𝚂𝙴!",
                  "rowId": ".? gift"
                }, {
                  "title": "🔞 〉ɞ 『 𝙽𝚂𝙵𝚆 』",
                  "description": "𝙰𝙳𝙸𝙲𝙺 𝙰𝙳𝙸𝙲𝙺 𝙹𝙰𝙽𝙶𝙰𝙽 𝙻𝙸𝙰𝚃 𝚈𝙰 𝙱𝙴𝚁𝙳𝙾𝚂𝙰...",
                  "rowId": ".? nsfw"
                }, {
                  "title": "⛩️ 〉ɞ 『 𝙰𝙽𝙸𝙼𝙴 』",
                  "description": "𝙱𝙰𝙽𝙷 𝙺𝙰𝙼𝚄 𝙰𝙽𝙹𝙸𝙼𝙴 𝚈𝙰𝙷 👆😅...",
                  "rowId": ".? anime"
                }, {
                  "title": "📰 〉ɞ 『 𝚗𝚎𝚠𝚜 ",
                  "description": "𝙱𝙴𝚁𝙸𝚃𝙰 𝙳𝙾𝙰𝙽𝙶 𝙺𝙾𝙺 𝙺𝙰𝙺...",
                  "rowId": ".? News"
                },  {
                  "title": "☪️ 〉ɞ 『 𝙸𝚂𝙻𝙰𝙼𝙸𝙲 』",
                  "description": "𝚃𝙾𝙱𝙰𝚃 𝚈𝚄𝙺 𝙺𝙰𝙺...",
                  "rowId": ".? quran"
                }, {
                  "title": "📚 〉ɞ 『 𝙴𝙳𝚄𝙺𝙰𝚂𝙸 』",
                  "description": "𝙱𝙴𝙻𝙰𝙹𝙰𝚁 𝙺𝙰𝙺 𝙱𝙸𝙰𝚁 𝙿𝙸𝙽𝚃𝙴𝚁",
                  "rowId": ".? edukasi"
                }, {
                  "title": "🖼️ 〉ɞ 『 𝙸𝙼𝙰𝙶𝙴 』",
                  "description": "𝚁𝙰𝙽𝙳𝙾𝙼 𝙸𝙼𝙰𝙶𝙴 & 𝚂𝙾𝙼𝙴𝚃𝙷𝙸𝙽𝙶...",
                  "rowId": ".? image"
                },  {
                  "title": "🎫 〉ɞ 『 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 』",
                  "description": "𝙼𝙴𝙼𝙱𝚄𝙰𝚃 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝚄𝙽𝙸𝙺!",
                  "rowId": ".? stiker"
                }, {
                  "title": "🐚 〉ɞ 『 𝙺𝙴𝚁𝙰𝙽𝙶 』",
                  "description": "𝙼𝙴𝙽𝚄𝚁𝚄𝚃 𝙺𝙴𝚁𝙰𝙽𝙶 𝙰𝙹𝙰𝙸𝙱...!",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "🎵 〉ɞ 『 𝚂𝙾𝚄𝙽𝙳 / 𝙼𝚄𝚂𝙸𝙲 』",
                  "description": "𝙳𝙴𝙽𝙶𝙰𝚁𝙺𝙰𝙽 𝙼𝚄𝚂𝙸𝙲 𝙳𝙴𝙽𝙶𝙰𝙽 𝚂𝙸𝙽𝙶𝙺𝙰𝚃",
                  "rowId": ".? sound"
                }, { 
                  "title": "😣 〉ɞ 『 𝚅𝙽 𝚂𝙾𝙺 𝙸𝙼𝚄𝚃 𝙺𝙾𝙽𝚃𝙾𝙻 』",
                  "description": "𝙼𝙴𝙽𝙳𝙴𝙽𝙶𝙰𝚁 𝚅𝙽 𝚈𝙶 𝚂𝙾𝙺 𝙸𝙼𝚄𝚃",
                  "rowId": ".? vn"                                                      
                }, {
                  "title": "📑 〉ɞ 『 𝚀𝚄𝙾𝚃𝙴𝚂 』",
                  "description": "𝚁𝙰𝙽𝙳𝙾𝙼 𝙺𝙰𝚃𝙰 𝙺𝙰𝚃𝙰 𝙰𝙻𝙰𝚈...",
                  "rowId": ".? quotes"
                }, {
                  "title": "🏛️ 〉ɞ 『  𝙶𝚁𝙾𝚄𝙿 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂 』",
                  "description": "𝙰𝙳𝙼𝙸𝙽 𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈!",
                  "rowId": ".? admin"
                }, {
                  "title": "👥 〉ɞ 『 𝙶𝚁𝙾𝚄𝙿 』",
                  "description": "𝙷𝙰𝙽𝚈𝙰 𝙱𝙸𝚂𝙰 𝙳𝙸𝙶𝚄𝙽𝙰𝙺𝙰𝙽 𝙳𝙸 𝙶𝚁𝙾𝚄𝙿!",
                  "rowId": ".? grup"
                }, {
                  "title": "🌟 〉ɞ 『 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 』",
                  "description": "𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝚄𝚂𝙴𝚁 𝙾𝙽𝙻𝚈!",
                  "rowId": ".? premium"
                }, {
                  "title": "💻 〉ɞ 『 𝙸𝙽𝚃𝙴𝚁𝙽𝙴𝚃 』",
                  "description": "𝙲𝙰𝚁𝙸 𝚂𝙴𝚂𝚄𝙰𝚃𝚄 𝚈𝙶 𝙼𝙴𝙽𝙰𝚁𝙸𝙺!",
                  "rowId": ".? internet"
                }, {
                  "title": "🎭 〉ɞ 『 𝙰𝙽𝙾𝙽𝚈𝙼𝙾𝚄𝚂 』",
                  "description": "𝙱𝙴𝚁𝙱𝙸𝙲𝙰𝚁𝙰 𝙳𝙴𝙽𝙶𝙰𝙽 𝙾𝚁𝙰𝙽𝙶 𝚃𝙸𝙳𝙰𝙺 𝙳𝙸𝙺𝙴𝙽𝙰𝙻...",
                  "rowId": ".? anonymous"
                }, {
                  "title": "🖊️ 〉ɞ 『 𝙴𝙳𝙸𝚃 𝙼𝙴𝙽𝚄 』",
                  "description": "𝙼𝙴𝙽𝚄𝙻𝙸𝚂 𝙳𝙰𝙽 𝙼𝙴𝙼𝙱𝚄𝙰𝚃 𝙻𝙾𝙶𝙾, 𝙳𝙻𝙻...",
                  "rowId": ".? nulis"
                }, {
                  "title": "📥 〉ɞ 『 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 』",
                  "description": "𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝚂𝙴𝚂𝚄𝙰𝚃𝚄 𝙳𝙸 𝙱𝙾𝚃!",
                  "rowId": ".? downloader"
                }, {
                  "title": "🧰 〉ɞ 『 𝚃𝙾𝙾𝙻𝚂 』",
                  "description": "𝙼𝚄𝙽𝙶𝙺𝙸𝙽 𝙸𝙽𝙸 𝙱𝙸𝚂𝙰 𝙼𝙴𝙼𝙱𝙰𝙽𝚃𝚄𝙼𝚄...",
                  "rowId": ".? tools"
                }, {
                  "title": "📂 〉ɞ 『 𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴 』",
                  "description": "𝙼𝙴𝙽𝚈𝙸𝙼𝙿𝙰𝙽 𝚂𝙴𝚂𝚄𝙰𝚃𝚄 𝙳𝙸 𝙱𝙾𝚃",
                  "rowId": ".? database"
                }, {
                  "title": "🗳️ 〉ɞ 『 𝚅𝙾𝚃𝙴 & 𝙰𝙱𝚂𝙴𝙽 』",
                  "description": "𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈!",
                  "rowId": ".? vote"
                }, {
                  "title": "🎙️ 〉ɞ 『 𝚅𝙾𝙸𝙲𝙴 』",
                  "description": "𝚅𝙾𝙸𝙲𝙴 𝙲𝙷𝙰𝙽𝙶𝙴𝚁..",
                  "rowId": ".? audio"
                }, {
                  "title": "🌐 〉ɞ 『 𝙼𝚄𝙻𝚃𝙸 𝚂𝙴𝚂𝚂𝙸𝙾𝙽 』",
                  "description": "𝙽𝚄𝙼𝙿𝙰𝙽𝙶 𝙹𝙰𝙳𝙸 𝙱𝙾𝚃 𝙺𝙰𝙷 𝙳𝙴𝙺?",
                  "rowId": ".? jadibot"
                }, {
                  "title": "ℹ️ 〉ɞ 『 𝙸𝙽𝙵𝙾 』",
                  "description": "𝙵𝙸𝚃𝚄𝚁 𝙸𝙽𝙵𝙾...",
                  "rowId": ".? info"
                }, {
                  "title": "❓ 〉ɞ 『 𝙽𝙾 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 』",
                  "description": "𝙵𝙸𝚃𝚄𝚁 𝚈𝙰𝙽𝙶 𝚃𝙴𝚁𝙻𝚄𝙿𝙰𝙺𝙰𝙽...",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "👩🏻‍💻 〉ɞ 『 𝙾𝚆𝙽𝙴𝚁 』",
                  "description": "𝙷𝙰𝙽𝚈𝙰 𝚄𝙽𝚃𝚄𝙺 𝙾𝚆𝙽𝙴𝚁 𝚂𝙷𝙸𝙽𝙸𝙲𝙷𝙸",
                  "rowId": ".? owner"
                }],
                                "title": " 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 "
                                }, {
                                "rows": [{                                	
                                "title": "📝 ∫ » 𝙲𝙰𝚃𝙰𝚃𝙰𝙽 𝙿𝙴𝚁𝚄𝙱𝙰𝙷𝙰𝙽 «",
                                "description": "𝚃𝙴𝙽𝚃𝙰𝙽𝙶 𝚄𝙿𝙳𝙰𝚃𝙴 𝚃𝙴𝚁𝙰𝙺𝙷𝙸𝚁 ",
                                "rowId": ".notes"
                 }],
                                "title": "𝙸𝙽𝙵𝙾 𝚄𝙿𝙳𝙰𝚃𝙴"
                                }, {
                                "rows": [{
                                "title": "🗳️ ∫ » 𝙳𝙾𝙽𝙰𝚂𝙸 «",
                                "description": "𝙳𝙾𝙽𝙰𝚂𝙸 𝙺𝙰𝙺, 𝙹𝙰𝙽𝙶𝙰𝙽 𝙴𝙽𝙰𝙰𝙺 𝙿𝙰𝙺𝙰𝙸 𝙳𝙾𝙰𝙽𝙶",
                                "rowId": ".donasi"
                                }, {
                                "title": "🔖 ∫ » 𝚂𝙴𝚆𝙰 «",
                                "description": "𝙼𝙴𝙽𝙰𝙼𝙿𝙸𝙻𝙺𝙰𝙽 𝙷𝙰𝚁𝙶𝙰 𝙻𝙸𝚂𝚃 𝚂𝙴𝚆𝙰 𝙱𝙾𝚃",
                                "rowId": ".sewa"
                                }, {
                                "title": "🌟 ∫ » 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 «",
                                "description": "𝙼𝙴𝙽𝙰𝙼𝙿𝙸𝙻𝙺𝙰𝙽 𝙻𝙸𝚂𝚃 𝙷𝙰𝚁𝙶𝙰 𝙿𝚁𝙴𝙼𝙸𝚄𝙼",
                                "rowId": ".premium"
                                }, {
                                "title": "🔬  ∫ » 𝚈𝙾𝚄𝚃𝚄𝙱𝙴 «",
                                "description": "𝚈𝙾𝚄𝚃𝚄𝙱𝙴 𝙾𝚆𝙽𝙴𝚁 𝚂𝙷𝙸𝙽𝙸𝙲𝙷𝙸",
                                "rowId": ".sc"
                                }, {
                                "title": "💭 ∫ » 𝙿𝙴𝚁𝚃𝙰𝙽𝚈𝙰𝙰𝙽 𝚃𝙴𝙽𝚃𝙰𝙽𝙶 𝙱𝙾𝚃 𝙸𝙽𝚄«",
                                "description": "𝙴𝚜𝚙𝚎𝚌𝚒𝚊𝚕𝚕𝚢 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙 𝚄𝚜𝚎𝚛𝚜 𝚆𝚑𝚘𝚜𝚎 𝙽𝚞𝚖𝚋𝚎𝚛𝚜 𝚂𝚝𝚊𝚛𝚝 𝚆𝚒𝚝𝚑 +212",
                                "rowId": ".QnA"
                                }, {
                                "title": "🎖️ ∫  » 𝚃𝙷𝙰𝙽𝙺𝚂 𝚃𝙾 «",
                                "description": "𝚃𝙴𝚁𝙸𝙼𝙰 𝙺𝙰𝚂𝙸𝙷 𝙱𝙰𝙽𝚈𝙰𝙺 𝚄𝙽𝚃𝚄𝙺 𝚄𝚂𝙴𝚁 𝚈𝙰𝙽𝙶 𝚂𝚄𝙳𝙰𝙷 𝙱𝙴𝚁𝙿𝙰𝚁𝚃𝙸𝚂𝙸𝙿𝙰𝚂𝙸 𝙳𝙴𝙽𝙶𝙰𝙽 𝚂𝙷𝙸𝙽𝙸𝙲𝙷𝙸 𝙱𝙾𝚃",
                                "rowId": ".? thnks"
                                }, {
                                "title": "☎️ ∫ » 𝙺𝙰𝚃𝙰 𝙿𝙴𝙽𝚄𝚃𝚄𝙿 «",
                                "description": "𝚝𝚎𝚛𝚒𝚖𝚊𝚔𝚊𝚜𝚒𝚑 𝚞𝚗𝚝𝚞𝚔 𝚞𝚜𝚎𝚛 𝚢𝚊𝚗𝚐 𝚝𝚎𝚕𝚊𝚑 𝚖𝚎𝚗𝚐𝚐𝚞𝚗𝚊𝚔𝚊𝚗 𝚋𝚘𝚝, 𝚓𝚒𝚔𝚊 𝚊𝚍𝚊 𝚔𝚎𝚜𝚊𝚕𝚊𝚑𝚊𝚗 𝚊𝚝𝚊𝚞 𝚙𝚎𝚛𝚖𝚒𝚗𝚝𝚊𝚊𝚗 𝚋𝚒𝚜𝚊 𝚌𝚑𝚊𝚝 𝚔𝚎 𝚗𝚘𝚖𝚘𝚛 𝚘𝚠𝚗𝚎𝚛\𝚗𝚗𝚘𝚝𝚎: 𝚌𝚑𝚊𝚝 𝚙/𝚖𝚊𝚒𝚗² 𝚝𝚒𝚍𝚊𝚔 𝚊𝚔𝚊𝚗 𝚍𝚒 𝚛𝚎𝚜𝚙𝚘𝚗(𝚞𝚜𝚎𝚛 𝚋𝚒𝚜𝚊 𝚝𝚎𝚛𝚔𝚎𝚗𝚊 𝚋𝚊𝚗𝚗𝚎𝚍/𝚋𝚕𝚘𝚌𝚔)",
                                "rowId": ".creator"
                                }],
                                "title": "▮𝙸𝙽𝙵𝙾 」"
                            }
                        ], "contextInfo": 
                         { "stanzaId": m.key.id,
                        "participant": m.sender,
                        "quotedMessage": m.message
                        }
                    }
                 }, {}), {waitForAck: true})
  
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '*Ⓛ*' : '')
                .replace(/%isPremium/g, menu.premium ? '*Ⓟ*' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      money, age, prems, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    // await conn.send3ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), '🎮 SHINN BOT', 'Creator', '.creator', 'Donasi', '.donasi', 'Rules', '.infobot', m)
    await conn.send3ButtonLoc(m.chat, logo, '────━⃝┅ *D A S H B O A R D* ┅⃝━────', text.trim(), 'Creator', '.creator', 'Donasi', '.donasi', 'Rules', '.rules', m)
    let nama = await conn.getName(m.sender)
    let fkon = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}


  logo2 = global.logo
  kanna = fs.readFileSync('./src/logo3.jpg')
  kannaImg = (await conn.prepareMessage('0@s.whatsapp.net', kanna, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  sumberImg = await (await fetch(fla + teks + ' menu')).buffer()
  image = (await conn.prepareMessage('0@s.whatsapp.net', logo2, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  /*res = await conn.prepareMessageFromContent(m.chat, {
    "productMessage": {
      "product": {
        "productImage": image,
        "productId": "4938174216214248",
        "title": '✧───────···[ Menu ]···────────✧',
        "description": `\n${wm}\n` + text,
        "retailerId": `${week}, ${date}  |  BY ADRI ‷♪`,
        "url": '\n',
        "descriptionCount": "999999999",
        "productImageCount": "1",
      },
      "businessOwnerJid": "0@s.whatsapp.net",
      "contextInfo": {
        "forwardingScore": 9999,
        "isForwarded": true
      }
    }
  },
    { quoted: fkon })
  conn.relayWAMessage(res)*/
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', '?', 'help']
handler.tags = ['main']
handler.command = /^(menu|\?|help)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi 🌄"
  }
  if (time > 10) {
    res = "Selamat siang ☀️"
  }
  if (time >= 15) {
    res = "Selamat sore 🌇"
  }
  if (time >= 18) {
    res = "Selamat malam 🌙"
  }
  return res
}