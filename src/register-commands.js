import dotenv from "dotenv";
import { zastavky } from "./zastavky.js";
dotenv.config();

import { REST, Routes, ApplicationCommandOptionType } from "discord.js";

const commands = [
  { name: "pozdrav", description: "Pozdraví ťa" },
  { name: "s", description: "/s ako sarkazmus" },
  { name: "joke", description: "says a joke" },
  {
    name: "povedz",
    description: "TODO",
    options: [
      {
        name: "text",
        description: "text",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "wiki-random",
    description: "Pošle ti náhodný článok zo slovenskej Wikipédie",
  },
  {
    name: "cesta",
    description: "Nájdi cestu medzi mestami",
    options: [
      {
        name: "skade",
        description: "Počiatočné miesto",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "kam",
        description: "Konečné miesto",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "kedy",
        description: "Čas odchodu vo formáte `h:mm`",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("pokúša sa zaregistrovať príkazy");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("vyšlo to! :D");
  } catch (error) {
    console.error(error);
  }
})();
