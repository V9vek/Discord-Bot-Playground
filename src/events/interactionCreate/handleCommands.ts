import {
  CacheType,
  Client,
  CommandInteraction,
  GuildMember,
  Interaction,
  PermissionsBitField,
} from "discord.js";
import { getLocalCommands } from "../../utils/getLocalCommands";
import { devs } from "../../../config.json";

export const listener = async (
  client: Client,
  interaction: CommandInteraction
) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands([]);

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes((interaction.member as GuildMember)?.id)) {
        interaction.reply({
          content: "Only developers are allowed to run this command",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (
          !(
            interaction.member?.permissions as Readonly<PermissionsBitField>
          ).has(permission)
        ) {
          interaction.reply({
            content: "Not enough permissions",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild?.members.me;
        if (!bot?.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permission",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // after all checks, calling the main functions of the command
    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
