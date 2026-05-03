import { GatewayIntentBits, Client } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

let hasGunga = false;
const delay = parseInt(process.env.DELAY || "0");

client.on("messageCreate", async (message) => {
  console.log("saw message", message.content);
  if (!message.guild || hasGunga) return;

  if (message.content === "gunga") {
    console.log("gunga");
    hasGunga = true;
    if (message.member?.voice.channel) {
      console.log(`waiting ${delay} seconds before joining voice channel`);
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));

      console.log("joining voice channel");
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource("./gunga.mp3");

      player.play(resource);
      connection.subscribe(player);

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("finished playing!");
        connection.destroy();
        hasGunga = false;
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

console.log("logging in...");

client.login(process.env.TOKEN);
