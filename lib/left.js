const fs = require('fs-extra')

module.exports = left = async (aruga, event) => {
	const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
	const isLeft = left.includes(event.chat)
	try {
		if (event.action == 'remove' && left) {
			const gChat = await aruga.getChatById(event.chat)
			const pChat = await aruga.getContact(event.who)
			const { contact, groupMetadata, name } = gChat
			const pepe = await aruga.getProfilePicFromServer(event.who)
			if (pepe == undefined) {
				var pp = 'https://i.ibb.co/DthYrSB/a256bae0f5ed.jpg'
			} else {
				var pp = pepe
			}
			await aruga.sendFileFromUrl(event.chat, pp, 'prof.jpg', `Babayy @${event.who.replace('@c.us', '')}\nFinally Beban Grup *${name}* berkurang 1`)
		}
		}
		} catch (err) {
			console.log(err)
		}
	}
