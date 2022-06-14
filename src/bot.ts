import { Client, Intents, Collection, MessageEmbed } from "discord.js";
import { config } from "dotenv";
import commands from "./commands";
import events from "./events";
import fs from "node:fs";
import { setTimeout } from "node:timers/promises";
import axios from "axios";

config();

const TOKEN = process.env.TOKEN;

// Create a new client instance
const client: any = new Client({
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

events.forEach((event: any) => {
  if (event.once) {
    client.once(event.name, (...args: any[]) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any[]) => event.execute(...args));
  }
});

client.commands = new Collection();

for (const commandData of commands) {
  const command = commandData.exp;
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.login(TOKEN);
