import { readdirSync } from "node:fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";

config();

const clientId = process.env.CLIENT_ID!;
const token = process.env.TOKEN!;

const commands = [];

const commandFiles = readdirSync("src/commands").filter((file: any) =>
  file.endsWith(".js"),
);

for (const file of commandFiles) {
  const command = require(`src/commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
