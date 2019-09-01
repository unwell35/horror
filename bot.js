const Discord = require('discord.js');
const client = new Discord.Client();
const RichEmbed = require("discord.js");
const { Client, Util } = require('discord.js');
const dateformat = require('dateformat');
const fs = require('fs');
const ms = require("ms")
const moment = require("moment")
const bot = client
bot.mutes = require("./mutes.json")
bot.on(`ready`, () => {
  console.log(`Log Bot | 0%`);
  console.log(bot.user.id);
})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const antic = JSON.parse(fs.readFileSync('./antic.json', 'utf8'));
client.on("message", message =>{
if(!antic[message.author.id]) {
antic[message.author.id] = {
actions: 0
}}
})

client.on('message', async (message) => {
  if (message.author.bot || !message.guild) return;
  let args = message.content.split(' ');
  let prefix = '-';
  if (args[0] == `${prefix}clear`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES') || !message.guild.me.hasPermission('MANAGE_MESSAGES')) return;
    if (!args[1]) return message.reply(`Usage , ${args[0]} [word]`);
    let fetched = await message.channel.fetchMessages();
    let filtered = await fetched.filter(m => m.content.includes(args.slice(1).join(' ')));
    await message.channel.bulkDelete(filtered);
  }
});

client.on('guildMemberRemove', alpha => {
alpha.guild.fetchAuditLogs().then( ac => {
var anti = ac.entries.first();
if(anti.action == "MEMBER_KICK") {
if(!antic[anti.executor.id]) {
antic[anti.executor.id] = {
actions: 0
};
} else { 
antic[anti.executor.id].actions+=1
if (antic[anti.executor.id].actions == 5) {
alpha.guild.members.get(anti.executor.id).ban("AntiHack")
console.log("banned griefer 1")
antic[anti.executor.id].actions = 0
}
}
    }
    });
    fs.writeFile("./antic.json", JSON.stringify(antic) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.on('roleDelete', alpha => {
alpha.guild.fetchAuditLogs().then( ac => {
var anti = ac.entries.first();
if(anti.action == "ROLE_DELETE") {
if(!antic[anti.executor.id]) {
antic[anti.executor.id] = {
actions: 0
};
} else { 
antic[anti.executor.id].actions+=1
if (antic[anti.executor.id].actions == 3) {
alpha.guild.members.get(anti.executor.id).ban("AntiHack")
console.log("banned griefer 1")
antic[anti.executor.id].actions = 0
}
}
    }
    });
    fs.writeFile("./antic.json", JSON.stringify(antic) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.on('channelDelete', alpha => {
alpha.guild.fetchAuditLogs().then( ac => {
var anti = ac.entries.first();
if(anti.action == "CHANNEL_DELETE") {
if(!antic[anti.executor.id]) {
antic[anti.executor.id] = {
actions: 0
};
} else { 
antic[anti.executor.id].actions+=1
if (antic[anti.executor.id].actions == 1) {
alpha.guild.members.get(anti.executor.id).ban("AntiHack")
console.log("banned griefer 1")
antic[anti.executor.id].actions = 0
}
}
    }
    });
    fs.writeFile("./antic.json", JSON.stringify(antic) ,(err) =>{
        if (err) console.log(err.message);
    });
});

client.on('guildBanAdd', function(alpha){
alpha.fetchAuditLogs().then( ac => {
var anti = ac.entries.first();
if(anti.action == "MEMBER_BAN_ADD") {
if(!antic[anti.executor.id]) {
antic[anti.executor.id] = {
actions: 0
};
} else { 
antic[anti.executor.id].actions+=1
if (antic[anti.executor.id].actions == 3) {
alpha.members.get(anti.executor.id).ban("AntiHack")
console.log("banned griefer 1")
antic[anti.executor.id].actions = 0
}
}
    }
    });
    fs.writeFile("./antic.json", JSON.stringify(antic) ,(err) =>{
        if (err) console.log(err.message);
    });
});
 
client.on('message', message => {
    if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('+moha')){
if (message.author.id !== '479090634813341696') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
message.channel.sendMessage('جار ارسال الرسالة |:white_check_mark:')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});


client.on('message', message => {
    if (message.content.startsWith("رابط")) {
  message.channel.createInvite({
        maxUses: 5,
        maxAge: 86400
    }).then(invite => {
message.author.send(invite.url)}).catch(e => message.channel.send(`**يجب عليك فتح خاصك **`));
message.author.send(`**مدة الرابط : يـوم
عدد استخدامات الرابط : 5**`);
message.channel.send("**🔗.تم ارسال الرابط برسالة خاصة**");
}
});

client.on("message", msg => {
var prefix = "-";
		    if(msg.author.id != '479090634813341696') return;
let men = msg.mentions.members.first()
if(!men || !men.voiceChannel) return;
if(msg.content === prefix+"vkick") {
men.setVoiceChannel(null)
}
});
client.on('message', msg => {
  var prefix = "-";  
  if (msg.content.startsWith(prefix + 'user')) { 
      if (msg.author.bot) return
      if (!msg.guild) return msg.reply('**:x: - This Command is only done on Servers**')
	  var args = msg.content.split(" ")[1];
	  var avt = args || msg.author.id;
      msg.guild.fetchInvites().then(invites => { 
          let personalInvites = invites.filter(i => i.inviter.id === msg.avt.id)
          let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0)
        var roles = msg.member.roles.map(roles => `**${roles.name}|**`).join(` `)
      let pixeluser = new Discord.RichEmbed() 
      .setColor('#3d8cf7')
      .setTitle(':clipboard: | User Info') 
      .setAuthor(msg.avt.username,msg.avt.avatarURL)
      .addField('**• Name :**', msg.avt.username,true)
      .addField('**• Tag :**', msg.avt.discriminator,true)
      .addField('**• ID :**', msg.avt.id,true)
      .addField('**• Joined At :**', moment(msg.joinedAt).format('D/M/YYYY h:mm a '),true)
      .addField('**• Created At :**', moment(msg.joinedAt).format('D/M/YYYY h:mm a '),true)
      .addField('**• Total invites :**', inviteCount,true)
      .addField('**• Roles :**', roles)
      .setTimestamp() 
      msg.channel.sendEmbed(pixeluser).then(c => {
              }) 
          })
      }
 
     
}); 
client.on('message', message => {
if(!message.channel.guild) return;
var prefix = "-";
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
var log = message.guild.channels.find('name', 'log-change-server-bc');
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);

if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });

reaction1.on("collect", r => {
message.channel.send(`☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`).then(m => m.delete(5000));
var embed = new Discord.RichEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL)
.setDescription(`**New Broadcast has been sent by:** <@${message.author.id}>`)
.addField(`**Message:** `, `\`\`\`${args}\`\`\``)
.setTimestamp()
.setThumbnail(message.author.avatarURL)
.setFooter(`${message.guild.name}`, message.guild.iconURL);
log.send({embed});
message.guild.members.forEach(m => {
m.send(args)
msg.delete();


})
})
reaction2.on("collect", r => {
message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});
client.on("message", message => {
	var prefix = "-";
if(message.content.startsWith(prefix + "avatar")){
	    if(message.author.id != '479090634813341696') return;
if(message.author.bot || message.channel.type == "dm") return;
var args = message.content.split(" ")[1];
var avt = args || message.author.id;
client.fetchUser(avt)
.then((user) => {
avt = user
let avtEmbed = new Discord.RichEmbed()
.setColor("#36393e")
.setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
.setImage(avt.avatarURL)
.setFooter(`Avt.`, message.client.user.avatarURL);
message.channel.send(avtEmbed);
})
.catch(() => message.channel.send(`Error`));
} 
});
    
                    client.on("message", message => {
                         var prefix = "-";
                        if (message.content.startsWith(prefix + "obc")) {
                                     if (!message.member.hasPermission("ADMINISTRATOR"))  return;
              let args = message.content.split(" ").slice(1);
              var argresult = args.join(' '); 
              message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
             m.send(`${argresult}\n ${m}`);
            })
             message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'online').size}\` : عدد الاعضاء المستلمين`); 
             message.delete(); 
            };     
            });


client.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`)
    bot.setInterval(() => {
        for (let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let member = bot.mutes[i].muted
            let mutereason = "Mute time is over"
            if (Date.now() > time) {
                bot.guilds.get(bot.mutes[i].guildid).members.get(`${member}`).removeRole(bot.mutes[i].roleid, mutereason)
                delete bot.mutes[i];
                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), (err) => {
                    if (err) throw err;
                    console.log(`${bot.users.get(member).username} has been unmuted`)
                })
            }
        }
    }, 5000)
})
bot.on("guildMemberAdd", async (member) => {
    for (let i in bot.mutes) {
        let data = bot.mutes[i];
        if (data === undefined) return;
        if (data.guildid !== member.guild.id) return;
        let mutereason = "طلع ودخل"
        let guildID = bot.mutes[i].guildid;
        if (member.id === bot.mutes[i].muted) {
            bot.guilds.get(`${guildID}`).members.get(`${member.id}`).addRole(`${bot.mutes[i].roleid}`, mutereason)
        } else {
            return;
        }
    }
})
client.on('message', async message => {
    let prefix = "#"
    let messageArray = message.content.split(' ')
    let args = messageArray.slice(1)
    let cmd = messageArray[0]
    if (cmd === `${prefix}سجن`) {
        message.delete();
        // هنا يمديك تحط الرولات الي يمديها تستعمل الكوماند
if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let themuteguy = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!themuteguy) return message.channel.send("**الرجاء وضع المنشن**").then(msg => msg.delete(8000))
        if (themuteguy.id == message.author.id) return message.reply('You cannot mute yourself can you 🌚? ')
        let roleid = message.guild.roles.find(c => c.name === "سجن")
        if (!roleid) return message.reply(`Please use \`${prefix}setup\` first`)
        let mutereason = args.join(" ").slice(25)
        if (!mutereason) return message.reply(`\`Usage: ${prefix}mute mention time reason\``)
        let time = args[1]
        if (ms(time) > 2.592e+9) return message.reply('Must be lower or equal to 30 days') // هنا لو الوقت اكثر من 30 يوم بيقلك م يمديك تسويله ميوت وهذي الجزئية مالها داعي لكن بتساعدك لو تبي تخلي ماكس للوقت
        if (themuteguy.roles.has(roleid.id)) return message.channel.send("هذا الشخص بالفعل موجود في السجن")
        bot.mutes.count++ + 1
        if (isNaN(bot.mutes.count)) bot.mutes.count = 0 + 1;
        bot.mutes[bot.mutes.count] = {
            time: Date.now() + ms(time),
            muted: themuteguy.id,
            roleid: roleid.id,
            guildid: message.guild.id
        }
        await message.guild.member(themuteguy.id).addRole(roleid.id, mutereason)
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if (err) throw err;
            message.reply(`تم سجن المُتهم  <@!${themuteguy.id}>`)
            let muteembed = new Discord.RichEmbed()//اللوق
            .setAuthor(`${themuteguy.tag}`, themuteguy.displayAvatarURL)
                .setTimestamp()
                .addField("For:", `${themuteguy}`)
                .addField("By:", `${message.author}`)
                .addField("Reason:", mutereason)
                .addField("Time", `${ms(ms(time), { long: true })}`)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${message.guild.name}`, message.guild.iconURL);
            let mutechannel = bot.channels.find(c => c.name === "log-mute-chat-voice-move")
            if (!mutechannel) return;
            mutechannel.send(muteembed)
        })
    }
    if (cmd == `${prefix}فك`) {
if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tounmute) return message.reply('**Mention someone to un!**')
        let muterole = message.guild.roles.find(c => c.name == 'سجن')
        if (!muterole) {
            aaa = await message.guild.createRole({
                name: "سجن",
                permissions: []
            });
        }
        if(!tounmute.roles.has(muterole.id)) return message.reply('Uhhh he\'s not muted!')
        for(var i in bot.mutes) {
            let data = bot.mutes[i];
            if(data.muted == tounmute.id && data.guild == message.guild.id){
            message.guild.members.get(`${tounmute.id}`).removeRole(message.guild.roles.find(c => c.name == 'سجن'), "Unmute command")
            delete bot.mutes[i];
            }
        }
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            message.channel.send('Done')
            if (err) throw err;
        })
    }
    if (cmd == `${prefix}setup`) { // الكوماند هذا لو انت سويت كاتقوري جديد وسويت فيه شانلات جديدة مو موجود فيها منع للميوت اكتب الكوماند ذا
if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let role = message.guild.roles.find(c => c.name === "سجن")
        if (!role) {
            muterole = await message.guild.createRole({
                name: "سجن",
                permissions: []
            });
        }
        message.guild.channels.forEach(async (channel) => {
            await channel.overwritePermissions(role.id, {
                CONNECT: false,
                SPEAK: false
            });
        });
        message.channel.send('Done')
    }
})

client.on("message", message => {
 var prefix = "-";
let num = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "vote")) {
 if (!message.member.hasPermission("ADMINISTRATOR"))  return;
if(isNaN(num)) return message.channel.send("ارقام فقط");
let votes = [
"رتبة اكتيف",
 "غير اسمك في الدسكورد الى حمار بجدارة",
  "حول للمقدم 1 كريدت",
 "افتح مايك وسمعنا صوتك وانت تغني",
 "غير صورتك الى فرس نهر",
 "المقدم يعطيك 5000 كريدت",
 "رحمتك اختار رقم ثاني",
 "حط صورتك بالدسكورد هذه https://pbs.twimg.com/media/Dba0D1uXcAA7tjI.jpg",
  "افتح المايك وقول الله يلعن اونر السيرفر",
  "منشن ثالث شخص بالشات وقله يلعن امك",
  "مبروك كسبت 20 الف كريدت من المقدم",
  "ياحظك رحمتك اخترلك رقم ثاني",
   "جيب التلفون او من البي سي واختر ثالث صوره من الاستوديو وارسلها وارسل دليل انه هيه ثالث صوره",
 "فك ميوت وعطي بوسه للمقدم",
  "ياحظك رحمتك اخترلك رقم ثاني",
   "فك ميوت وسب ع شخص يمنشلك ياه المقدم",
  "افتح المايك وقول الله يلعن اونر السيرفر",
 "خلي المقدم يمنشن شخص وتروحله خاص تقله احبك وصور وارسل",
  "غير اسمك في الدسكورد الى حمار بجدارة",
  "دق ع ابوك وقله احبك",
  "دق ع ابوك قله اكرهك",
 "غير اسمك في السيرفر واكتب السيرفر كله تاج راسي",
 "غير اسمك في الدسكورد الى حمار بجدارة",
 "خلي المقدم يمنشن شخص وروح خاصه وسبه وصور ",
 "فك ميوت وغني اغنيه تكوتا",
  "حول 10000 كريدت للمقدم",
 "روح لاونر السيرفر وقله الله يلعن خيرك",
 "قول اسم حبيبتك او منشنها",
 "فك ميوت وقول انا خروف ماااااااااع",
"kya"
]
let voted = votes[parseInt(num)]
if(!voted) return message.channel.send("لم يتم العثور")
message.channel.send(voted)
}
});

const devs = ["479090634813341696"]

const adminprefix = "-";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else 
    if (message.content === (adminprefix + "Percie")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else     
    if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.sendMessage(`**${argresult}** : Done :>`)
  return message.reply("**You Can't Change Your Name ,Only After Two Hours :>**");
  } else
    if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
        } else     
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }
    if(message.content === adminprefix + "restart") {
      if (!devs.includes(message.author.id)) return;
          message.channel.send(`:warning:️ **Bot restarting by ${message.author.username}**`);
        console.log("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(`⚠️ Bot restarting... ⚠️`);
        console.log("===============================================\n\n");
        client.destroy();
        child_process.fork(__dirname + "/bot.js");
        console.log(`Bot Successfully Restarted`);
    }
  
  });
/*
client.on('guildMemberAdd', (member) => {
  member.addRole(member.guild.roles.find('name', 'Horror', { reason: 'AutoRole' }));
  });
*/
    client.on('guildMemberAdd', (member) => {
      var reasonn = "AutoRole"
      let autorole = member.guild.roles.find(r => r.name === "Horror");
      member.addRole(autorole, reasonn)
      });
client.on('message', message => {
    var tag = "pic";
	var reasonn = "PicRole"

    var prefix = "#";
    if(message.content.startsWith(prefix + "صور")){
	    if (message.author.bot) return undefined;
    let pic = message.member.guild.roles.find('name', tag)
  message.member.addRole(pic, reasonn).then(() => message.channel.send("**تم اعطائك رتبة الصور بنجاح** <a:event:589081992788705291>"))
    
    }
  });

client.on('message', async message => {
            if(message.content.includes('discord.gg')){ 
                if(message.member.hasPermission("MANAGE_ROLES")) return;
        if(!message.channel.guild) return;
        message.delete()
          var command = message.content.split(" ")[0];
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
           if(!message.channel.guild) return message.reply('** This command only for servers**');
     message.member.addRole(muterole);
    const embed500 = new Discord.RichEmbed()
      .setTitle("Muted Ads")
            .addField(`**  You Have Been Muted **` , `**Reason : Sharing Another Discord Link**`)
            .setColor("c91616")
            .setThumbnail(`${message.author.avatarURL}`)
            .setAuthor(message.author.username, message.author.avatarURL)
        .setFooter(`${message.guild.name} `)
     message.channel.send(embed500)
     message.author.send('**انت معاقب ميوت شاتي بسبب نشر سرفرات ان كان عن طريق الخطآ تكلم مع الادارة **');
   
       
    }
})
client.on('message', message => {
  var prefix = "-";
  const guild = message.guild;

  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");

  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");


  message.guild.member(user).ban(7, user);

message.channel.send(`**:white_check_mark: ${user.tag} Banned From The Server By : <@${message.author.id}> Reason: ${reason} ! :airplane: **  `)
  
guild.owner.send(`سيرفر : ${guild.name}
**تم تبنيد** :${user.tag}  
**بواسطة** : <@${message.author.id}>
**السبب** : ${reason} `)

}
});
  client.on("guildBanAdd", (guild, member) => {
    client.setTimeout(() => {
      guild.fetchAuditLogs({
          limit: 1,
          type: 22
        })
        .then(audit => {
          let exec = audit.entries.map(a => a.executor.username);
          try {
            client.fetchUser(member.id).then(myUser => {
              guild.owner.send(`سيرفر : ${guild.name}
              **${myUser.username} تم تبنيد  
             بواسطة : ${exec}**`).catch(e => {
              console.log(e);
            });
            });
          } catch (e) {
            console.log(e);
          }
        });
    }, 1000);
  });


client.on('voiceStateUpdate', (old, now) => {
 const channel = client.channels.get('554423259115028481');
 const currentSize = channel.guild.members.filter(m => m.voiceChannel).size;
  const size = channel.name.match(/\[\s(\d+)\s\]/);
  if (!size) return channel.setName(`Horror : ${currentSize}`);
  if (currentSize !== size) channel.setName(`Horror : ${currentSize}`);
});

 client.on(`guildMemberUpdate`, async (om, nm) => {
   if(!om || !om.id) return;
 
   const channel = nm.guild.channels.find(ch => ch.name == 'log-roles')
     const channell = nm.guild.channels.find(ch => ch.name == 'log-mute-chat-voice-move')
   if(!channel) return console.log('I can\'t find it');
 
 
 
     om.guild.fetchAuditLogs()
     .then(async logs => {
       let user = logs.entries.first().executor
       let changes = logs.entries.first().changes
       let reason = logs.entries.first().reason;
 
 
       if(om.roles.size < nm.roles.size) {
         let role = changes[0].new
         let name = role[0].name
         let id = role[0].id
         let embed = new Discord.RichEmbed()
 
         .setAuthor(`${nm.user.tag}`, nm.user.displayAvatarURL)
         .setTimestamp()
         .setDescription(`:white_check_mark: ${nm} **was given the** \`${name}\` **role by:** ${user}`)
         .setThumbnail(nm.user.displayAvatarURL)
         .setFooter(`${nm.guild.name}`, nm.guild.iconURL);

                 if(reason) {
           embed.addField("Reason:", reason)
           }
         channel.send("", { embed : embed } )
 
 }
     if(om.roles.size > nm.roles.size) {
       let role = changes[0].new
       let name = role[0].name
       let id = role[0].id
 
       let embed = new Discord.RichEmbed()
       .setAuthor(`${nm.user.tag}`, nm.user.displayAvatarURL)
       .setTimestamp()
       .setDescription(`:no_entry: ${nm} **was removed from the** \`${name}\` **role by:** ${user}`)
       .setThumbnail(nm.user.displayAvatarURL)
       .setFooter(`${nm.guild.name}`, nm.guild.iconURL);

               if(reason) {
           embed.addField("Reason:", reason)
           }
       channel.send("", { embed : embed } )
     }
 
     if(om.nickname !== nm.nickname) {
 
       let embed = new Discord.RichEmbed()
       .setAuthor(`${nm.user.tag}`, nm.user.displayAvatarURL)
       .setTimestamp()
       .setDescription(`:white_check_mark: ${nm} **Nickname was changed by:** ${user}`)
       .addField('**Old Nickname**', `\`\`${om.nickname}\`\``)
       .addField('**New Nickname**', `\`\`${nm.nickname}\`\``)
       .setThumbnail(nm.user.displayAvatarURL)
       .setFooter(`${nm.guild.name}`, nm.guild.iconURL);

       channell.send("", { embed : embed } )
     }
 
   })
 
 })
 client.on('channelCreate', channel => {
 
  if(!channel.guild) return;
  if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = channel.guild.channels.find(c => c.name === 'log-chats');
  if(!logChannel) return;

  if(channel.type === 'text') {
      var roomType = 'Text';
  }else
  if(channel.type === 'voice') {
      var roomType = 'Voice';
  }else
  if(channel.type === 'category') {
      var roomType = 'Category';
  }

  channel.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor;
      var userAvatar = logs.entries.first().executor.avatarURL;
      let reason = logs.entries.first().reason;

      let channelCreate = new Discord.RichEmbed()
      .setAuthor(`${userID.tag}`, userID.displayAvatarURL)
      .setThumbnail(userID.displayAvatarURL)
      .setDescription(`**Channel Created By:** ${userID}`)
      .addField('**Name :**', `${channel.name}`, true)
      .addField('**Type :**', `${roomType}`, true)
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL)
      if(reason) {
        channelCreate.addField("Reason:", reason)
        }
      logChannel.send(channelCreate);
  })
});

client.on('channelDelete', ( ch ) => {

  let guild;
  while (!guild)
      guild = ch.guild


  const channel = ch.guild.channels.find(ch => ch.name == 'log-chats')
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {

    const user = logs.entries.first().executor
    const changes = logs.entries.first().changes
    let reason = logs.entries.first().reason;


    var type = '';

    if(ch.type === 'text') type = 'Text Channel'
    if(ch.type === 'voice') type = 'Voice Channel'
    if(ch.type === 'category') type = 'Category Channel'

    const embed = new Discord.RichEmbed()
    .setAuthor(`${user.tag}`, user.displayAvatarURL)
    .setDescription(`**Channel** ${ch.name} **has been deleted by:** ${user}`)
    .addField('**Channel Name:**', `${ch.name}`)
    .addField('**Channel Type:**', `${type}`)
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL)
    .setFooter(`${guild.name}`, guild.iconURL);
    if(reason) {
      embed.addField("Reason:", reason)
      }


    channel.send("", { embed : embed } )

  })

})
/*
client.on('channelUpdate', (oC, nC) => {

  //console.log(nC);

  let guild;
  guild = oC.guild;

  const channel = guild.channels.find(ch => ch.name == 'log-chats')
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {


    let user = logs.entries.first().executor;
    let changes = logs.entries.first().changes;


    const embed = new Discord.RichEmbed()
    .setAuthor(`${user.tag}`, user.displayAvatarURL)
    .setTimestamp()

    if(logs.entries.first().action == 'CHANNEL_OVERWRITE_CREATE') {
      let roleOrUser
      changes.forEach(change => {
        if(change.key == 'id') {
          if(changes[1].new == 'role') roleOrUser = `<@&${change.new}>`
          else if(changes[1].new == 'member') roleOrUser = `<@${change.new}>`
        } 
      })
      embed.setDescription(`${roleOrUser} **Permissions has been added to** ${nC} **By:** ${user}`)
      embed.setThumbnail(user.displayAvatarURL)
      embed.setFooter(`${guild.name}`, guild.iconURL);
    }

    if(logs.entries.first().action == 'CHANNEL_OVERWRITE_DELETE') {
      let roleOrUser
      changes.forEach(change => {
        if(change.key == 'id') {
          if(changes[1].old == 'role') roleOrUser = `<@&${change.old}>`
          else if(changes[1].old == 'member') roleOrUser = `<@${change.old}>`
        } 
      })
      embed.setDescription(`${roleOrUser} **Permissions has been deleted from** ${nC} **By:** ${user}`)
      embed.setThumbnail(user.displayAvatarURL)
      embed.setFooter(`${guild.name}`, guild.iconURL);
    }

    if(logs.entries.first().action == 'CHANNEL_UPDATE') {
      if(oC.id == "570303330920824832") return;

    embed.setDescription(`**Channel** <#${oC.id}> **has been updated by:** ${user}`)
    embed.setThumbnail(user.displayAvatarURL)
    embed.setFooter(`${guild.name}`, guild.iconURL);
    if(oC.name != nC.name) {
      embed.addField('**Old Name**',`${oC.name}`, true)
      embed.addField('**New Name**', `${nC.name}`, true)
      embed.setThumbnail(user.displayAvatarURL)
      embed.setFooter(`${guild.name}`, guild.iconURL);
    }
    if(oC.topic != nC.topic) {
      embed.addField('**Old Topic**', `${oC.topic ? oC.topic : 'Null'}`, true)
      embed.addField('**New Topic**', `${nC.topic ? nC.topic : 'Null'}`, true)
      embed.setThumbnail(user.displayAvatarURL)
      embed.setFooter(`${guild.name}`, guild.iconURL);
    }
    if(oC.nsfw != nC.nsfw) {
      embed.addField('**NSFW:**', nC.nsfw ? 'ON' : 'OFF');
      embed.setThumbnail(user.displayAvatarURL)
      embed.setFooter(`${guild.name}`, guild.iconURL);
    }
    changes.forEach(change => {
      if(change.key == 'rate_limit_per_user') {
        embed.addField('**Old Slowmode Time:**', `${change.old}`, true)
        embed.addField('**New Slowmode Time:**', `${change.new}`, true);
        embed.setThumbnail(user.displayAvatarURL)
        embed.setFooter(`${guild.name}`, guild.iconURL);
      }
    })
  }
  channel.send("", { embed : embed } )
  })

})*/
client.on('roleUpdate', (oR, nR) => {

  let guild;
    while (!guild)
      guild = oR.guild

      const channel = guild.channels.find(ch => ch.name == 'log-roles')
      if(!channel) return;

      guild.fetchAuditLogs()
      .then(logs => {

        const user = logs.entries.first().executor
        const changes = logs.entries.first().changes


        function colorToHexString(dColor) {
    return '#' + ("000000" + (((dColor & 0xFF) << 16) + (dColor & 0xFF00) + ((dColor >> 16) & 0xFF)).toString(16)).slice(-6);
          }

          if (oR.permissions != nR.permissions) {

            let perms = {
              added: [],
              removed: []
            }

            let newPerms = new Discord.Permissions(nR.permissions);
            let nArr = newPerms.toArray();

            let oldPerms = new Discord.Permissions(oR.permissions);
            let oArr = oldPerms.toArray();

            nArr.forEach(perm => {
              
              if(oArr.includes(perm)) return;

              else if(!oArr.includes(perm)) {
                perms.added.push(perm);
              } 

            })

            oArr.forEach(perm => {

              if(nArr.includes(perm)) return;

              else if(!nArr.includes(perm)) {
                perms.removed.push(perm);
              } 

            })

            const embed = new Discord.RichEmbed()
            .setAuthor(`${user.tag}`, user.displayAvatarURL)
            .setDescription(`${nR} **role permissions has been updated by:** ${user}`);
            if(perms.added[0]) {
              let text = '';
              perms.added.map(p => text += `${p}\n`)
              embed.setAuthor(`${user.tag}`, user.displayAvatarURL)
              embed.addField('**Permissions Added:**', `\`\`\`${text}\`\`\``);
            }

            if(perms.removed[0]) {
              let text = '';
              perms.removed.map(p => text += `${p}\n`)
              embed.setAuthor(`${user.tag}`, user.displayAvatarURL)
              embed.addField('**Permissions Removed:**', `\`\`\`${text}\`\`\``);
            }

            embed.setColor(nR.hexColor)
            embed.setFooter(`${guild.name}`, guild.iconURL);
            embed.setThumbnail(user.displayAvatarURL)
            embed.setTimestamp()

            channel.send("", { embed: embed } )

          }

          if((oR.name !== nR.name) || (oR.hexColor !== nR.hexColor)) {

          const embed = new Discord.RichEmbed()
          .setAuthor(`${user.tag}`, user.displayAvatarURL)
          .setDescription(`*${nR} **role has been updated by:** ${user}`)
          if(oR.name !== nR.name) {
            embed.addField('**Old Name:**', `${oR.name}`)
            embed.addField('**New Name:**', `${nR.name}`)
          }
          if(oR.hexColor !== nR.hexColor) {
            embed.addField('**Old Color:**', `${oR.hexColor}`)
            embed.addField('**New Color:**', `${nR.hexColor}`)
          }



          embed.setColor(nR.hexColor)
          embed.setThumbnail(user.displayAvatarURL)
          embed.setFooter(`${guild.name}`, guild.iconURL);
          embed.setTimestamp()


          channel.send("", { embed : embed } )
}
      })
})
client.on('roleDelete', (role) => {

  let guild;
    while (!guild)
      guild = role.guild

      var time = new Date()
      var mask = 'yyyy-mm-dd h:MM'

      var timestamp = dateformat(time, mask)

      const channel = guild.channels.find(ch => ch.name == 'log-roles')
      if(!channel) return;

      guild.fetchAuditLogs()
      .then(logs => {

        const user = logs.entries.first().executor

        const embed = new Discord.RichEmbed()
        .setAuthor(`${user.tag}`, user.displayAvatarURL)
        .setDescription(`\`${role.name}\` **has been deleted by:** ${user}`)
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp()
        .setFooter(`${guild.name}`, guild.iconURL);


        channel.send( { embed : embed } )

      })

})
client.on('guildBanAdd', (guild, user) => {
 
  if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = guild.channels.find(c => c.name === 'log-ban-kick');
  if(!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor;
      var reason = logs.entries.first().reason;


      if(userID === client.user.id) return;

      let banInfo = new Discord.RichEmbed()

      .setAuthor(`${user.tag}`, user.displayAvatarURL)
      .setDescription(`<@${user.id}> **banned from the server by:** ${userID}`)
      .setThumbnail(userID.displayAvatarURL)
     .setTimestamp()
      .setFooter(`${guild.name}`, guild.iconURL);
      if(reason) {
        banInfo.addField("Reason:", reason)
        }
      logChannel.send(banInfo);
  })
});
client.on('guildBanRemove', (guild, user) => {
  if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = guild.channels.find(c => c.name === 'log-ban-kick');
  if(!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor;
      var userAvatar = logs.entries.first().executor.avatarURL;  
      var reason = logs.entries.first().reason;      

      let unBanInfo = new Discord.RichEmbed()
      .setAuthor(`${userID.tag}`, userID.displayAvatarURL)
      .setThumbnail(userID.displayAvatarURL)
      .setDescription(` <@${user.id}>**Unbanned by:** ${userID}`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL)
      if(reason) {
        unBanInfo.addField("Reason:", reason)
        }
      logChannel.send(unBanInfo);
  })
});
client.on('messageDelete', (msg) => {

  var guild;
    while(!guild)
      guild = msg.guild;


    let channel = guild.channels.find(ch => ch.name == 'log-mute-chat-voice-move');
    if(!channel) return;

    guild.fetchAuditLogs()
    .then(logs => {

      let user = logs.entries.first().executor;


      const embed = new Discord.RichEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(`:wastebasket: **Message Deleted** <@${msg.author.id}> in ${msg.channel}`)
      .addField('**Message:**', `\`\`\`${msg.cleanContent}\`\`\``)
      .setThumbnail(msg.author.displayAvatarURL)
      .setFooter(`${guild.name}`, guild.iconURL);
      if(user) {
        embed.addField("**By:**", user)
        }
      channel.send( { embed : embed } )


    })

})


client.on('messageUpdate', (oldmsg, newmsg) => {

  if(oldmsg.content == newmsg.content) return;

  var guild;
    while(!guild)
      guild = newmsg.guild;


    let channel = guild.channels.find(ch => ch.name == 'log-mute-chat-voice-move');
    if(!channel) return;

    guild.fetchAuditLogs()
    .then(logs => {

      let user = logs.entries.first().executor;


      const embed = new Discord.RichEmbed()
      .setAuthor(`${newmsg.author.tag}`, newmsg.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(`:pencil2:  **Message Updated** in ${newmsg.channel} `)
      .addField('**Old Message:**', `\`\`\`${oldmsg.cleanContent}\`\`\``)
      .addField('**New Message:**', `\`\`\`${newmsg.cleanContent}\`\`\``)
      .setThumbnail(newmsg.author.displayAvatarURL)
      .setFooter(`${guild.name}`, guild.iconURL);


      channel.send( { embed : embed } )


    })

})
client.on('guildUpdate', (oldGuild, newGuild) => {
 
  if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = oldGuild.channels.find(c => c.name === 'log-change-server');
  if(!logChannel) return;

  oldGuild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor;
      var userAvatar = logs.entries.first().executor.avatarURL;

      if(oldGuild.name !== newGuild.name) {
          let guildName = new Discord.RichEmbed()
          .setAuthor(`${userID.tag}`, userID.displayAvatarURL)
          .setThumbnail(userID.displayAvatarURL)
          .setDescription(`**Updated Server by:** ${userID}`)
          .addField('**Old Name:**', `\`\`\`${oldGuild.name}\`\`\``)
          .addField('**New Name:**', `\`\`\`${newGuild.name}\`\`\``)
          .setTimestamp()
          .setFooter(newGuild.name, oldGuild.iconURL)

          logChannel.send(guildName)
      }
      if(oldGuild.region !== newGuild.region) {
          let guildRegion = new Discord.RichEmbed()
          .setAuthor(`${userID.tag}`, userID.displayAvatarURL)
          .setThumbnail(userID.displayAvatarURL)
          .setDescription(`**Updated Server by:** ${userID}`)
          .addField('**Old Region:**', `\`\`\`${oldGuild.region}\`\`\``)
          .addField('**New Region:**', `\`\`\`${newGuild.region}\`\`\``)
          .setTimestamp()
          .setFooter(oldGuild.name, oldGuild.iconURL)

          logChannel.send(guildRegion);
      }
      if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
          if(oldGuild.verificationLevel === 0) {
              var oldVerLvl = 'Very Easy';
          }else
          if(oldGuild.verificationLevel === 1) {
              var oldVerLvl = 'Easy';
          }else
          if(oldGuild.verificationLevel === 2) {
              var oldVerLvl = 'Medium';
          }else
          if(oldGuild.verificationLevel === 3) {
              var oldVerLvl = 'Hard';
          }else
          if(oldGuild.verificationLevel === 4) {
              var oldVerLvl = 'Very Hard';
          }

          if(newGuild.verificationLevel === 0) {
              var newVerLvl = 'Very Easy';
          }else
          if(newGuild.verificationLevel === 1) {
              var newVerLvl = 'Easy';
          }else
          if(newGuild.verificationLevel === 2) {
              var newVerLvl = 'Medium';
          }else
          if(newGuild.verificationLevel === 3) {
              var newVerLvl = 'Hard';
          }else
          if(newGuild.verificationLevel === 4) {
              var newVerLvl = 'Very Hard';
          }

          let verLog = new Discord.RichEmbed()
          .setAuthor(`${userID.tag}`, userID.displayAvatarURL)
          .setThumbnail(userID.displayAvatarURL)
          .setDescription(`**Updated Server by:** ${userID}`)
          .addField('**Old Region:**', `\`\`\`${oldVerLvl}\`\`\``)
          .addField('**New Region:**', `\`\`\`${newVerLvl}\`\`\``)
          .setTimestamp()
          .setFooter(oldGuild.name, oldGuild.iconURL)

          logChannel.send(verLog);
      }
  })
});
client.on('guildMemberAdd', member => {
  var logChannel = member.guild.channels.find(c => c.name === 'log-join-leave');
  if(!logChannel) return;
 
  let newMember = new Discord.RichEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`<@${member.user.id}> **joined the server.**`)
  .addField('**Joined Discord:**', `\`${moment(member.user.createdAt).format('D/M/YYYY h:mm')}\`\n**${moment(member.user.createdAt).fromNow()}**`)
  .setTimestamp()
 
  logChannel.send(newMember);
});

client.on('guildMemberRemove', member => {
  var logChannel = member.guild.channels.find(c => c.name === 'log-join-leave');
  if(!logChannel) return;
 
  let leaveMember = new Discord.RichEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`<@${member.user.id}> **Left the server**`)
  .setTimestamp()
 
  logChannel.send(leaveMember);
});
// Voice Logs
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
  if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = voiceOld.guild.channels.find(c => c.name === 'log-mute-chat-voice-move');
  if(!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id;
      var userTag = logs.entries.first().executor.tag;
      var userAvatar = logs.entries.first().executor.avatarURL;

// Server Muted Voice
      if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
          let serverMutev = new Discord.RichEmbed()
          .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
          .setDescription(`**Voice state of** <@${voiceOld.user.id}> **has been updated. by:** <@${userID}> **Channel:** \`\`${voiceOld.voiceChannel.name}\`\``)
          .addField(':microphone2: **Server Mute**', `**True**`)
          .setTimestamp()
          .setFooter(userTag, userAvatar)


          logChannel.send(serverMutev);
      }
// Server UnMuted Voice
      if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
          let serverUnmutev = new Discord.RichEmbed()
          .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
          .setDescription(`**Voice state of** <@${voiceOld.user.id}> **has been updated. by:** <@${userID}> **Channel:** \`\`${voiceOld.voiceChannel.name}\`\``)
          .addField(':microphone2: **Server Mute**', `**False**`)
          .setTimestamp()
          .setFooter(userTag, userAvatar)

          logChannel.send(serverUnmutev);
      }
// Server Deafen Voice
      if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
          let serverDeafv = new Discord.RichEmbed()
          .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
          .setDescription(`**Voice state of** <@${voiceOld.user.id}> **has been updated. by:** <@${userID}> **Channel:** \`\`${voiceOld.voiceChannel.name}\`\``)
          .addField(':mute: **Server Deafen**', `**True**`)
          .setTimestamp()
          .setFooter(userTag, userAvatar)

          logChannel.send(serverDeafv);
      }
// Server UnDeafen Voice
      if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
          let serverUndeafv = new Discord.RichEmbed()
          .setAuthor(voiceOld.user.tag, voiceOld.user.avatarURL)
          .setDescription(`**Voice state of** <@${voiceOld.user.id}> **has been updated. by:** <@${userID}> **Channel:** \`\`${voiceOld.voiceChannel.name}\`\``)
          .addField(':loud_sound: **Server Deafen**', `**False**`)
          .setTimestamp()
          .setFooter(userTag, userAvatar)

          logChannel.send(serverUndeafv);
      }
  })
});


            client.login(process.env.BOT_TOKEN);
