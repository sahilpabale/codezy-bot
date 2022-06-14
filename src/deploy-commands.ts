import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";
import commandsArr from "./commands/index";

config();

const clientId = process.env.CLIENT_ID!;
const token = process.env.TOKEN!;
const commands = [];

for (const commandData of commandsArr) {
  let command = commandData.exp;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
