const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const p = config.prefix;
//=================================================================================\\
let statuses = ['!a help|V1.5.0', '!a help|nya', '!a help|Asteray', '!a help|Discord,Js!'];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  setInterval(function() {

    let status = statuses[Math.floor(Math.random()*statuses.length)];

    client.user.setPresence({ game: { name: status }, status: 'idle'});
  }, 5000)

})
//=================================================================================\\
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
//=================================================================================\\
  if(command === "github") {
    message.channel.send({embed: {
      color: 5784356,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Click Here For The Link",
      url: "https://github.com/AceEllysium/discord-bot",
      description: "\u200b"}});
  }
//==================================================================================\\
  if(command === 'invite') {
    message.channel.send({embed: {
      color: 5784356,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Click Here For The Link",
      url: "https://discordapp.com/api/oauth2/authorize?client_id=459245951924830208&permissions=0&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Foauth2%2Fauthorize%3Fclient_id%3D459245951924830208%26scope%3Dbot&scope=bot",
      description: "\u200b"}})
  }
//==================================================================================\\
  if(command === 'support') {
    message.channel.send({embed: {
      color: 5784356,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Click Here For The Link",
      url: "https://discord.gg/nfZdkrU",
      description: "\u200b"}})
  }
//==================================================================================\\
  if(command === 'test') {
    message.channel.send('succes')
  }
//===================================================================================\\
  if(command === "hello") {
    message.channel.send('Heyaa');
  }
//====================================================================================\\
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
//=====================================================================================\\
  if(command === 'slap') {
    message.channel.send('I Will Never Slap U :heart: http://lykosapi.cuddliness.xyz/images/hugs/tumblr_o76qfcMiFn1sk1rjvo1_500.gif ')
  }
//=======================================================================================\\
  if(command === "feel") {
    var x = Math.floor((Math.random() * 2) + 1);
    if(x===1) {
      message.channel.send("I Feel Good");
    } else {
      message.channel.send("I Feel Not So Good")
    }
  }
//=======================================================================================\\    
if(command === "purge") {
  // This command removes all messages from all users in the channel, up to 100.

  const deleteCount = parseInt(args[0], 10);
  
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
  
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}
//=====================================================================================\\
if (command === "help") {
  const embed = new Discord.RichEmbed()
    .setAuthor("Help Page", client.user.avatarURL)
    .setColor([200, 124, 233])
    .addField("!a help", "This Menu")
    .addField("!a ping", "Pong!")
    .addField("!a test", "Respond With Success")
    .addField("!a feel", "Hows The Bot Feeling")
    .addField("!a github", "Gives The GitHub Link")
    .addField("!a slap", "Slaps U(Or Not)")
    .addField("!a hello", "Responds With heyaa")
    .addField("!a purge", "Deletes Messages")
    .addField("!a invite", "Gives Bot Invite List")
    .addField("!a support", "Gives The Discord Support Server Link");

  message.channel.sendEmbed(embed);
  message.channel.sendMessage(`${message.author}, Sending Help Menu... NOW!`);
}
//=======================================================================================\\
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const noperm1 = new Discord.RichEmbed()
      .setTitle("No permission")
      .setColor([255, 92, 92])
      .setDescription("You require the permission **Manage Messages** to execute this command!");

    return message.channel.sendEmbed(noperm1);
  }
  const amountmsg = new Discord.RichEmbed()
    .setColor([255, 92, 92])
    .setDescription("You have to specify an amount and/or user to delete!");

  const user = message.mentions.users.first();
  const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
  if (!amount) return message.channel.sendEmbed(amountmsg);
  if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
  const succeed = new Discord.RichEmbed()
    .setColor([255, 92, 92])
    .setDescription(`Successfully deleted ${amount} messages!`);

  message.channel.fetchMessages({
   limit: amount,
  }).then((messages) => {
   if (user) {
   const filterBy = user ? user.id : Client.user.id;
   messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
   }
   message.channel.bulkDelete(messages)
   message.channel.sendEmbed(succeed);
  });
}
//=====================================================================\\    

});        
client.login(config.token);
