let handler = async (m, { conn }) =>
conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
                    "listMessage":  {
                        "title": `Hai Kak ${conn.getName(m.sender)}\nβ­ββ γ π¦ππ§π§ππ‘π ππ₯π’π¨π£ γβββ¬£\nβ¦ Donasi Ya Agar Bot On Selalu\nβ¦ Cara Mengaktifkan Fitur Group Bisa Dengan Klik Tombol Di Bawah\n\nπ Atau Dengan Cara\nβ°ββββββββββββββββββββ¬£\nβ­ββ γ ππ’π‘π§π’π γββββ¬£\nβ¦ .on welcome\nβ¦ .on antilink\nβ°ββββββββββββββββ¬£`,
                        "description": "\n\n*@AxellXyz*",
                        "footerText": "πππππ ππππ’πͺ ππ‘π πππ’π’π¦π",
                        "buttonText": "πππππ πππ₯πβ",
                        "listType": "SINGLE_SELECT",
                        "sections": [
                            {
                                "rows": [
                                    {
                                    	"title": "WELCOMEπ",
                                        "description": "mengaktifkan fitur welcome",
                                        "rowId": ".on welcome"
                                        },{
                                    	"title": "OFF WELCOMEπ",
                                        "description": "menonaktifkan fitur welcome",
                                        "rowId": ".off welcome"
                                        },{
                                    	"title": "ANTI DELETEβ",
                                        "description": "mengaktifkan fitur antidelete",
                                        "rowId": ".on delete"
                                        },{
                                        "title": "OFF ANTI DELETEβ",
                                        "description": "menonaktifkan fitur antidelete",
                                        "rowId": ".off delete"
                                        },{
                                        "title": "VIEWONCEπΎ",
                                        "description": "mengaktifkan fitur viewonce",
                                        "rowId": ".on viewonce"
                                        },{
                                        "title": "OFF VIEWONCEπΎ",
                                        "description": "menonaktifkan fitur viewonce",
                                        "rowId": ".off viewonce"             
                                        },{
                                        "title": "DETECTβ",
                                        "description": "mengaktifkan fitur detect",
                                        "rowId": ".on detect"
                                        },{
                                        "title": "OFF DETECTβ",
                                        "description": "menonaktifkan fitur detect",
                                        "rowId": ".off detect"
                                        },{
                                    	"title": "ANTIBADWORDπ«",
                                        "description": "mengaktifkan fitur antibadword",
                                        "rowId": ".on antibadword"
                                        },{
                                    	"title": "OFF ANTIBADWORDπ«",
                                        "description": "menonaktifkan fitur antibadword",
                                        "rowId": ".off antibadword"
                                        },{
                                    	"title": "ANTILINKβ",
                                        "description": "mengaktifkan fitur antilink",
                                        "rowId": ".on antilink"
                                        },{
                                    	"title": "OFF ANTILINKβ",
                                        "description": "menonaktifkan fitur antilink",
                                        "rowId": ".off antilink"
                                    }
                                ]
                            }
                        ], "contextInfo": { "stanzaId": m.key.id,
"participant": "0@s.whatsapp.net",
"quotedMessage": m.message
}
                    }
                 }, {}), {waitForAck: true})

handler.help = ['grubsettings']
handler.tags = ['group']
handler.command = /^(setelangrub|grubsett|settingsgrub|grubsettings|settgrub|groupsett)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler
