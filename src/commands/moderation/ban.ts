import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  PermissionFlagsBits,
} from "discord.js";

export const command = {
  name: "ban",
  description: "Bans a member from Server",
  // devOnly: Boolean, // if true, userid included in devs of config.json are only allowed
  // testOnly: Boolean, 
  // deleted: Boolean, // if true, command will be deleted
  options: [
    {
      name: "target-user",
      description: "The user to ban.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "The reason for banning",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client: Client, interaction: CommandInteraction) => {
    interaction.reply(`Ban! ${client.ws.ping}`);
  },
};
