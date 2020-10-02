const { Message } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'This command kicks the player;',
    execute(message, args){
      console.log('kick command sent')

     


    //Then check if user have permissions to do that
    if(!message.member.hasPermission('KICK_MEMBERS')) {
        message.reply('You have no permissions to do that');
        return;
    };

    //const a member, wich you need yo kick (its fist mention message member)
    let mentionMember = message.mentions.members.first();
    //If user dont mention a member, that show him this error msg
    if(!mentionMember) {
        message.reply('You need to mention a member to kick!');
        return;
    }

   

    //Check if your bot can`t kick this user, so that show this error msg 
    if(!mentionMember.kickable) {
        message.reply('I have no permissions to kick this user.');
        return
    };

    
    if(!args[1]){
        message.reply('Please have a reason!');
        return;
    };

    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Moderation')
        .setDescription("New Kick!")
        .addFields(
            { name: 'Offender', value: `${memberto.displayName}` },
            { name: "Sender:", value: `${message.member.displayName}` },
            { name: 'Reason: ', value: `${args[1]}`},
        )
        .setTimestamp();
    const channel = message.guild.channels.cache.find(channel => channel.name === "mod-logs")
    //If all steps are completed successfully try kick this user
    mentionMember.kick(args[1])
        .then(() => console.log(`Kicked ${mentionMember.displayName} by ${message.member.displayName}`))
        mentionMember.send(`You have been kicked from ${message.channel.guild}. Reason: ${args[1]}`)
        message.reply(`Sucessfully Kicked ${mentionMember.displayName} for ${args[1]}`)
        channel.send(exampleEmbed)
        .catch(console.error);    
    }
}