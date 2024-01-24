import { Client } from "discord.js";

export const listener = (client: Client) => {
    console.log(`✅${client.user?.tag} is online`);
};
