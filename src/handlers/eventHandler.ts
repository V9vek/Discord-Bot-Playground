import * as path from "path";
import { getAllFiles } from "../utils/getAllFiles";
import { Awaitable, Client } from "discord.js";

type DataOfFileType = {
  // arg is optional
  listener: (c: Client, arg?: any) => Promise<any>;
};

export const handleEvent = (client: Client<boolean>) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => (a > b ? 1 : -1));    

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    // event listener
    client.on(eventName!, async (arg) => {
      for (const eventFile of eventFiles) {
        const dataOfFile: DataOfFileType = require(eventFile);
        await dataOfFile.listener(client, arg);
      }
    });
  }
};
