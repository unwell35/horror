const Discord = require('discord.js');
const client = new Discord.Client();
const RichEmbed = require("discord.js");
const { Client, Util } = require('discord.js');
const dateformat = require('dateformat');
const bot = new Discord.Client();
const fs = require('fs');
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
client.on('message', message => {
  if(!message.channel.guild) return;
var prefix = "-";
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let copy = "Dragon";
let request = `Requested By ${message.author.username}`;
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

client.on('guildMemberAdd', (member) => {
member.addRole(member.guild.roles.find('name', 'Horror'));
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
 const channel = client.channels.get('570303330920824832');
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
 client.on('channelCreate', (ch) => {

  let guild = ch.guild

  let channel = guild.channels.find(ch => ch.name == 'log-chats')
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {

    let user = logs.entries.first().executor;
    let changes = logs.entries.first().changes;
    let reason = logs.entries.first().reason;

    let name = changes[0].new
    let typeNo = changes[1].new
    let perm;

    let type = '';

    if(typeNo == 0) {
      type = 'Text Channel'
    } else if (typeNo == 4) {
      type = 'Category Channel'
    } else if (typeNo == 2) {
      type = 'Voice Channel'
    }

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.tag}`, user.displayAvatarURL)
    .setTimestamp()
    .setDescription('**Channel Created! By:** ' + '<@' + user.id + '>')
    .addField('**Name :**', `${name}`, true)
    .addField('**Type :**', `${type}`, true)
    .setThumbnail(user.displayAvatarURL)
    .setFooter(`${guild.name}`, guild.iconURL);
    if(reason) {
      embed.addField("Reason:", reason)
      }
    channel.send("", { embed : embed } )

  })
})

client.on('channelDelete', ( ch ) => {

  let guild;
  while (!guild)
      guild = ch.guild


  const channel = guild.channels.find(ch => ch.name == 'log-chats')
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

})
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
            client.login(process.env.BOT_TOKEN);
