const { create, Client } = require('@open-wa/wa-automate')
const figlet = require('figlet')
const fs = require('fs-extra')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')

const start = (aruga = new Client()) => {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('URBAE BOT', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('Urbae', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))

    // Mempertahankan sesi agar tetap nyala
    aruga.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') aruga.forceRefocus()
    })

    // ketika bot diinvite ke dalam group
     aruga.onAddedToGroup((async (chat) => {
        let totalMem = chat.groupMetadata.participants.length
        let groupName = chat.contact.name
	const gucid = gcid.includes(groupId)
        const ownerNumber = '62895334950905@c.us'
        const getAllMembers = await aruga.getGroupMembersId(chat.groupMetadata.id)
        if (totalMem < 300 && !getAllMembers.includes(ownerNumber)) {
            aruga.sendText(chat.id, `Upss...\n\nUntuk bisa mengundang bot kedalam grup *${name}*. Diwajibkan untuk donasi dulu yah ^^\n\n10K = 1 Minggu\n20K = 1 Bulan\n50K = Forever\n\nJika berminat, langsung chat contact admin dengan cara ketik: */ownerbot*`).then(() => aruga.leaveGroup(chat.id)).then(() => aruga.deleteChat(chat.id))
        } else {
            aruga.sendText(chat.groupMetadata.id, `Halo *${name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim */help* dan jangan lupa bantu owner untuk bisa memperbesar server agar bot ini tidak suspend/slow respon dengan cara kirim */donasi*`)
        }
    }))

    // ketika seseorang masuk/keluar dari group
   aruga.onGlobalParicipantsChanged(async (event) => {
        const host = await aruga.getHostNumber() + '@c.us'
        if (event.action === 'add' && event.who !== host) {
            const gChat = await aruga.getProfilePicFromServer(event.who)
	    const capt = `Ey yo @${event.who.replace('@c.us', '')} Welcome to *${name}\n\nIntro dulu yuk hambaku\nNama :\nUmur :\nGender :\nInstagram :\n\nDon't forget to follow the rules of ${name} Group!\n\nBest regards\n-Thoriq Azzikra\n\nhttps://github.com/Urbaeexyz/whatsapp-bot2`
	    await aruga.sendFileFromUrl(event.chat, gChat, 'prof.jpg', capt)
        }
        // kondisi ketika seseorang dikick/keluar dari group
        if (event.action === 'remove' && event.who !== host) {
            const zchat = await aruga.getProfilePicFromServer(event.who)
            const aigo = `eh @${event.who.replace('@c.us', '')} malah keluar:(`
            await aruga.sendFileFromUrl(event.chat, zchat, 'profile.jpg', aigo)
        }
    })

    aruga.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await aruga.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n-bot')
        .then(async () => {
            // bot akan memblock nomor itu
            await aruga.contactBlock(callData.peerJid)
        })
    })

    // ketika seseorang mengirim pesan
    aruga.onMessage(async (message) => {
        aruga.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[aruga]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    aruga.cutMsgCache()
                }
            })
        HandleMsg(aruga, message)    
    
    })
	
    // Message log for analytic
    aruga.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
}

//create session
create(options(true, start))
    .then((aruga) => start(aruga))
    .catch((err) => new Error(err))
