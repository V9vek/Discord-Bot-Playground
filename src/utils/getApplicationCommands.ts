import {
  ApplicationCommandManager,
  CachedManager,
  Client,
  GuildApplicationCommandManager,
} from "discord.js";

export const getApplicationCommands = async (
  client: Client,
  guildId: string
) => {
  let applicationCommands: any;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = client.application?.commands;
  }

  await applicationCommands?.fetch();

  return applicationCommands;
};
