import { Client } from "discord.js";
import { devs, testServer } from "../../../config.json";
import { getLocalCommands } from "../../utils/getLocalCommands";
import { getApplicationCommands } from "../../utils/getApplicationCommands";
import { areCommandsDifferent } from "../../utils/areCommandsDifferent";

export const listener = async (client: Client) => {
  try {
    const localCommands = getLocalCommands([]);
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd: any) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          // deleting the command, if it is set to be deleted
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command ${name}`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          // editing the existing command
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`🖊 Edited command ${name}`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `Skipping registering command ${name}, as it is set to be deleted`
          );
          continue;
        }

        // regsitering the command
        await applicationCommands.create({
          name,
          description,
          options,
        });
        console.log(`👍🏻 Registered the command "${name}"`);
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
