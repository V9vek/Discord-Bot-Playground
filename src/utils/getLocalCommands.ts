import * as path from "path";
import { getAllFiles } from "./getAllFiles";

type DataOfFileType = {
  command: {};
};

export const getLocalCommands = (exceptions: string[]) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);
    for (const commandFile of commandFiles) {
      const dataOfFile: DataOfFileType = require(commandFile);
      const commandObject: any = dataOfFile.command; // later on make type for COMMANDS

      if (exceptions.includes(commandObject.name)) continue;
      
      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
