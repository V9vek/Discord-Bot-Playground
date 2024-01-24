import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import "dotenv/config";

const commands = [
  {
    name: "hey",
    description: "Replies with hello!",
  },
  {
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "first-number",
        description: "The first number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "second-number",
        description: "The second number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST().setToken(process.env.TOKEN!);

(async () => {
  try {
    console.log("Regsitering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands }
    );

    console.log("Slash commands registered successfully");
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
})();
