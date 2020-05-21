const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

let hasGunga = false;

client.on('message', async (message) => {
  if (!message.guild || hasGunga) return;

  if (message.content === 'gunga') {
    hasGunga = true;
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play('./gunga.mp3');
      dispatcher.on('finish', () => {
        console.log('Finished playing!');
      });
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
