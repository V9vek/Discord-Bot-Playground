import { CacheType, Client, CommandInteraction, Interaction } from "discord.js";

export const command = {
  name: "ping",
  description: "Pong!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: [],
  callback: (client: Client, interaction: CommandInteraction) => {
    interaction.reply(`Pong! ${client.ws.ping}`);
  },
};
