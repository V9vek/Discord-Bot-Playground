import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { handleEvent } from "./handlers/eventHandler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// client.once(Events.ClientReady, (c) => {
//   console.log(`✅ ${c.user.tag} is online`);
// });

handleEvent(client)

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  if (message.content === "hello") {
    message.reply("yo! welcome to the server");
  }
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "hey") {
    interaction.reply("hello! welcome")
  }
  if(interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number")?.value as number;
    const num2 = interaction.options.get("second-number")?.value as number;
    interaction.reply(`Sum is ${num1 + num2}`)
  }
})

client.login(process.env.TOKEN);
