import { Client } from "discord.js";

const selectMenuInteraction = async (interaction: any) => {};

export default [
  {
    name: "ready",
    once: true,
    execute(client: Client) {
      console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
  },
  {
    name: "interactionCreate",
    async execute(interaction: any) {
      if (interaction.isSelectMenu()) {
        await selectMenuInteraction(interaction);
      } else {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(
          interaction.commandName,
        );

        if (!command) return;

        try {
          await command.execute(interaction);
        } catch (error) {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    },
  },
];
