import dotenv from "dotenv";
dotenv.config();

import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
  Partials,
  ChannelType,
  Guild,
} from "discord.js";
import { parse } from "node-html-parser";
import mongoose from "mongoose";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const statuses = [
  {
    name: "paint drying",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=PLOPygVcaVE",
  },
  {
    name: "drinking",
    type: ActivityType.Custom,
    state: "Dodržiavajúci pitný režim",
  },
  {
    name: "wiki",
    type: ActivityType.Custom,
    state: "Falling into a Wikipedia rabbit hole",
  },
  {
    name: "chrúst",
    type: ActivityType.Custom,
    state: "Rozmýšľajúci nad nesmrteľnosťou chrústa",
  },
  {
    name: "mail",
    type: ActivityType.Custom,
    state: "Sending all incoming mail to /dev/null",
  },
  {
    name: "the annual Minecraft anti-speedrun",
    type: ActivityType.Competing,
  },
  {
    name: "the voices in my head",
    type: ActivityType.Listening,
  },
  {
    name: "Discord simulator",
    type: ActivityType.Playing,
  },
  {
    name: "Half Life 3",
    type: ActivityType.Playing,
  },
  {
    name: "over my neighbor's annoying cat",
    type: ActivityType.Watching,
  },
  {
    name: "procrastinating",
    type: ActivityType.Custom,
    state: "Procrastinating",
  },
  {
    name: "stalking",
    type: ActivityType.Custom,
    state: "Stalking everyone on this server",
  },
  {
    name: "what the other bot has to offer",
    type: ActivityType.Listening,
  },
  {
    name: "Lokálny muzikant",
    type: ActivityType.Listening,
  },
  {
    name: "ucenie",
    type: ActivityType.Custom,
    state: "Učiaci sa booleovskú logiku",
  },
  {
    name: "ucenie2",
    type: ActivityType.Custom,
    state: "Učiaci sa históriu dinosaurov",
  },
  {
    name: "rozmysla2",
    type: ActivityType.Custom,
    state: "Rozmýšľajúci nad vhodnou večerou",
  },
  {
    name: "hromziaci",
    type: ActivityType.Custom,
    state:
      "Hromžiaci na tú prekliatu nechutnosť plnú čiernej mágie nazývanú AIS2",
  },
  {
    name: "kut",
    type: ActivityType.Custom,
    state: "Ležiaci skrčený v kúte",
  },
  {
    name: "blender",
    type: ActivityType.Custom,
    state: "Modelujúci v Blenderi",
  },
  {
    name: "zalohovanie",
    type: ActivityType.Custom,
    state: "Zálohujúci si svoje údaje",
  },
  {
    name: "prehliadac",
    type: ActivityType.Custom,
    state: "Meniaci si svoj východiskový prehliadač",
  },
  {
    name: "linux",
    type: ActivityType.Custom,
    state: "Inštalujúci ďalšiu distribúciu Linuxu",
  },
  {
    name: "statusy",
    type: ActivityType.Custom,
    state: "Čítajúci si statusy ostatných ľudí",
  },
  {
    name: "statusy2",
    type: ActivityType.Custom,
    state: "Píšuci hlúpe statusy ktoré aj tak nik nečíta",
  },
  {
    name: "piano",
    type: ActivityType.Playing,
  },
  {
    name: "with fire",
    type: ActivityType.Playing,
  },
  {
    name: "ležanie na 100 metrov",
    type: ActivityType.Competing,
  },
  {
    name: "1D chess",
    type: ActivityType.Competing,
  },
  {
    name: "three witches watch three Swatch watches",
    type: ActivityType.Watching,
  },
  {
    name: "my neighbor using a glass pressed on their door",
    type: ActivityType.Listening,
  },
  {
    name: "my empty desktop to my 2 followers",
    type: ActivityType.Streaming,
  },
];

async function routine() {
  // change statuses periodically
  client.user.setActivity(statuses[getRandomInt(statuses.length)]);

  // randomly assign someone the role @someone
  const someoneId = "1266117205947584573";
  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  const currentSomeoneList = (await guild.roles.fetch(someoneId)).members;

  // remove the role from the person who has it
  if (currentSomeoneList != undefined) {
    await Promise.all(
      Array.from(
        currentSomeoneList.map((currentSomeone) =>
          guild.members.removeRole({ user: currentSomeone, role: someoneId })
        )
      )
    );
  }

  // add it to someone at random
  const memberList = await guild.members.fetch();
  const randomMember = memberList.at(getRandomInt(memberList.size));
  guild.members.addRole({
    user: randomMember,
    role: someoneId,
  });

  console.log(`@someone added to ${randomMember.displayName}`);
}

client.on("ready", async (c) => {
  console.log(`${c.user.tag} is ready.`);

  routine();
  setInterval(async () => routine(), 100000);

  // check Unum
});

const swears = [
  /^pič.$/,
  /^pice$/,
  /^pici$/,
  /^picovina$/,
  /^sra.$/,
  /^posra.$/,
  /^nasra.$/,
  /^kokot.*$/,
  /^.?kurv.*$/,
  /^jebn.*$/,
  /^jeba.*$/,
  /^..?.?jeba.*$/,
  /^kkt$/,
  /^pojeb.*$/,
  /^fuck.*$/,
  /^cunt$/,
  /^ass$/,
  /^asshole$/,
  /^bitch$/,
  /^shit.*$/,
  /^.*shit$/,
];

const alternativeSwears = [
  "Pre kristove rany!",
  "Doparoma!",
  "Anciáša!",
  "Do kelu!",
  "Kurník šopa!",
  "Aby ťa Parom vzal!",
  "Pre Pána Jána!",
];

const alternativePeopleSwears = ["nešťastník", "hlava deravá", "môj milý"];

const jokes = [
  "Why did the kitchen cross- Why did the chicken cross- ah, I ruined it already...",
  "Why did the *chicken* cross the road? Because seven ate nine... no, wrong joke, sorry...",
  "Why did the chicken get to the other side? Bec- ah, hell, I already said the punchline... sorry",
  "Why was six afraid of seven? Oh wait, you heard the punchline too...",
  "Sorry, I'm terrible at jokes...",
  "Not feeling up to it now, tbh...",
];

const swearResponsesStandalone = [
  "Ja to poviem teraz, že milí moji, naozaj ja vás skúsim aj v rámci serveru aj do budúcna od slov expresívnych poprosiť, aby sa na serveri nediali.",
  'Čo do pekla si to práve povedal, ty poleno? Mal by si vedieť že som zmaturoval zo slovenčiny na najlepšiu známku z celej triedy, robil som jazykovú korektúru pre mnohé family-friendly vydavateľstvá a mám vyše 300 potvrdených korektúr. Som trénovaní v odstraňovaní neslušného jazyka a som vo svojej práci jeden z najlepších z celej literárnej scény Slovenska. Pre mňa nie si nik, len obyčajný grázel a ničomník, ktorý si myslí že svojimi nadávkami pôsobí "hip" a "cool". Ale počúvaj ma dobre, ty decko - žiaden "rizz" si takouto rečou nezískaš. Celé tvoje okolie bude ohŕňať nosom nad takým nevychovancom, akým si práve ty. Mohol si miesto toho použiť hocijaké iné zo státisíc slov v našej rodnej reči, ale neurobil si to, a teraz za to budeš trpieť.',
];

const swearResponses1 = [
  "Čo za slová hanlivé som to práve zočil?!",
  "A či tu nadávanie počujem?",
  "Čo si to práve povedal, papľuh jeden?",
  "Žiadne nadávky! Totot je kresťanský server!",
  "Nehanbíš sa takto rozprávať pred všetkými?!",
  "Žiadne nadávanie!",
];

const swearResponses2 = [
  "Či týmito istými ústami svoju mater na líca bozkávaš?",
  "Keby toto tvoja triedna učiteľka videla, za hlavu by sa chytala...",
  "Ešte raz a si ťa bloknem!",
  "Kam táto dnešná mládež speje...",
  "Slušne sa tu bude hovoriť!",
  "Toto je kresťanský server!",
];

let angriness = 0;
let calm = 0;
let jokeCounter = 0;
const maxSwears = 6;

let lastAngryMessageId = 0;
let sinceLastAngryMessage = 9999999;
let angryAt = "";
let apologised = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function noSwearing() {
  // single response
  if (Math.random() < 0.1) {
    return swearResponsesStandalone[
      getRandomInt(swearResponsesStandalone.length)
    ];
  } else {
    // multi-part response
    return (
      swearResponses1[getRandomInt(swearResponses1.length)] +
      " " +
      swearResponses2[getRandomInt(swearResponses2.length)]
    );
  }
}

function getSwearEmoji() {
  const random = getRandomInt(6);

  if (random == 0) {
    return "🙄";
  } else if (random == 1) {
    return "😡";
  } else if (random == 2) {
    return "🙎";
  } else if (random == 3) {
    return "😑";
  } else {
    return "😠";
  }
}

client.on("messageCreate", async (message) => {
  //console.log(message);

  // replace @someone
  if (message.content.includes("<@&1266117205947584573>")) {
    routine();
  }

  if (!message.author.bot) {
    // for real users only

    const words = message.content
      .toLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}!=$§_\-;]/g, "")
      .split(" ");
    let isSwearing = false;

    swears.forEach((swear) => {
      words.forEach((word) => {
        if (swear.test(word)) {
          isSwearing = true;
        }
      });
    });

    //if (swears.some((swear) => message.content.toLowerCase().includes(swear))) {
    if (isSwearing) {
      console.log(`Pozor! ${message.author.displayName} nám tu nadáva!`);

      angriness += 1;
      calm = 0;

      if (apologised.includes(message.author.username)) {
        message.reply(
          "Tak najprv sa tu ospravedlňuješ a potom zas nadávaš... to kde sme"
        );

        if (Math.random() > 0.7) {
          apologised = [];
        }
      } else if (angriness > maxSwears) {
        message.react(getSwearEmoji());
      } else if (angriness === maxSwears) {
        message.reply(
          "Nemám už nervy na vás, tak si tu nadávajte ak tak veľmi chcete"
        );
      } else {
        lastAngryMessageId = (await message.reply(noSwearing())).id;
        sinceLastAngryMessage = 0;
        angryAt = message.author.username;
      }
    } else {
      // calm down a bit
      calm += 1;
      if (calm >= 15) {
        angriness = 0;
      }

      sinceLastAngryMessage += 1;

      // apology
      if (sinceLastAngryMessage < 5 && angryAt === message.author.username) {
        let acceptApology = false;
        ["prepáč", "sorry", "pardon", "soráč", "ospravedlňuje"].forEach(
          (apology) => {
            if (message.content.includes(apology)) {
              acceptApology = true;
            }
          }
        );

        if (acceptApology) {
          message.reply("Je ti odpustené :D Len už prosím viac nenadávaj");
          angriness = 0;
          apologised.push(message.author.username);
        }
      }

      // krindž
      if (message.reference != null) {
        if (
          (await message.channel.messages.fetch(message.reference.messageId))
            .author.id === process.env.CLIENT_ID
        ) {
          if (angriness > 0) {
            if (message.content.includes("cringe")) {
              message.reply("Ja ti dám cringe");
            } else if (Math.random() > 0.8) {
              message.reply("pls nepinguj ma");
            }
          }
        }
      }
    }
  }

  // shutdown
  if (
    message.channel.type === ChannelType.DM &&
    message.author.username === "cxivo"
  ) {
    if (message.content === "shutdown") {
      message.react(":ok:");
      throw new Error("Vypnutý užívateľom");
    }
  }
});

// commands
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    // pozdrav
    if (interaction.commandName === "pozdrav") {
      interaction.reply("ahoj!!");
    }

    // sarkazmus
    if (interaction.commandName === "s") {
      interaction.channel.send(
        `(${interaction.user.displayName} to myslelô sarkasticky)`
      );
      interaction.reply({ content: "poslané", ephemeral: true });
    }

    // joke
    if (interaction.commandName === "joke") {
      interaction.reply(jokes[Math.min(jokes.length - 1, jokeCounter)]);
      jokeCounter += 1;
    }

    // povedz
    if (interaction.commandName === "povedz") {
      // len cxivo
      if (interaction.user.username === "cxivo") {
        interaction.channel.send(interaction.options.get("text").value);
        interaction.reply({
          content: "vykonané :sunglasses:",
          ephemeral: true,
        });
        // ostatní
      } else {
        interaction.reply({
          content: "nie je implementovaný :/",
          ephemeral: true,
        });
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // cesta
    // https://www.inprop.sk/files/products/tt/CP_API.pdf

    if (interaction.commandName === "cesta") {
      let origoBegin = interaction.options.get("skade")?.value;
      let origoEnd = interaction.options.get("kam")?.value;
      let time = interaction.options.get("kedy")?.value;

      let begin = origoBegin.replaceAll(" ", "%20");
      let end = origoEnd.replaceAll(" ", "%20");

      let good = false;

      const stopType = [
        [400003, 400003],
        [1, 1],
        [1, 400003],
        [400003, 1],
      ];

      for (let index = 0; index < 4; index++) {
        if (good) {
          break;
        }

        let cpURL =
          "https://cp.sk/vlakbusmhd/spojenie/vysledky/?f=" +
          begin +
          "&fc=" +
          stopType[index][0] +
          "&t=" +
          end +
          "&tc=" +
          stopType[index][1];

        if (time) {
          cpURL += "&time=" + time;
        }

        console.log(cpURL);

        try {
          const response = await fetch(cpURL);
          if (response.status < 300) {
            // it's okay
            const template = await response.text();
            const root = parse(template);

            const connectionList = root
              .getElementById("col-content")
              .querySelector("div div.connection-list")
              .querySelectorAll("div.connection");

            const connection0 = connectionList[0];
            const timeAndDateNode = connection0.querySelector(
              "div.connection-head div.date-total label h2"
            );
            const timeAndDate =
              "**" +
              timeAndDateNode.text.substring(
                0,
                timeAndDateNode.text.indexOf(":") + 3
              ) +
              "**, " +
              timeAndDateNode.text.substring(
                timeAndDateNode.text.indexOf(":") + 3
              );

            const distanceAndTime = connection0.querySelectorAll(
              "div.connection-head div.date-total label p strong"
            );

            const rides = connection0.querySelectorAll(
              "div.connection-details div.line-item div.outside-of-popup"
            );

            const title =
              root.getElementById("From").getAttribute("value") +
              " --> " +
              root.getElementById("To").getAttribute("value");

            const embed = new EmbedBuilder()
              .setTitle(title)
              .setDescription(timeAndDate)
              .setURL(cpURL)
              .setColor(0x8888ff)
              .addFields(
                {
                  name: "Trvanie",
                  value: distanceAndTime[0].text,
                  inline: true,
                },
                {
                  name: "Vzdialenosť",
                  value: distanceAndTime[1]
                    ? distanceAndTime[1].text
                    : "neznáme :(",
                  inline: true,
                },
                {
                  name: "--------------------------",
                  value: " ",
                }
              );

            rides.forEach((ride) => {
              const stops = ride.querySelectorAll("ul.stations li");
              embed.addFields({
                name: ride.querySelector("a div div h3").text,
                value:
                  " - **" +
                  stops[0].querySelector("p.time").text +
                  "** " +
                  stops[0].querySelector("p.station").text +
                  "\n- **" +
                  stops[1].querySelector("p.time").text +
                  "** " +
                  stops[1].querySelector("p.station").text,
              });
            });

            interaction.reply({ embeds: [embed] });
            good = true;
          } else {
            //console.log(response.status);
          }
        } catch (error) {
          //console.log(error);
        }
      }

      if (!good) {
        interaction.reply(
          `Nepodarilo sa nájsť cestu medzi ***${origoBegin}*** a ***${origoEnd}***`
        );
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // náhodný článok
    if (interaction.commandName === "wiki-random") {
      try {
        const response = await fetch(
          "https://sk.wikipedia.org/wiki/%C5%A0peci%C3%A1lne:N%C3%A1hodn%C3%A1"
        );
        if (response.status < 300) {
          // it's okay
          const template = await response.text();
          const root = parse(template);

          const title = root
            .getElementById("firstHeading")
            .getElementsByTagName("span")[0].innerHTML;

          const text = root
            .getElementById("mw-content-text")
            .querySelector("div.mw-content-ltr p").text;

          const lastEdit = root.getElementById("footer-info-lastmod").text;

          if (text.length >= 2000) {
            text = text.substring(0, 1999);
          }

          const embed = new EmbedBuilder()
            .setTitle(title)
            .setURL(response.url)
            .setThumbnail(
              "https://sk.wikipedia.org/static/images/icons/wikipedia.png"
            )
            .setDescription(text)
            .setColor("Random")
            .setFooter({ text: lastEdit });

          // possible image
          const images = root.getElementsByTagName("img");

          // sets first image
          for (let i = 0; i < images.length; i++) {
            const src = images[i].getAttribute("src");
            if (src.startsWith("//upload.wikimedia.org")) {
              embed.setImage("https:" + src);
              break;
            }
          }

          interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(`Nezdarilo sa :/ Chyba: ${response.status}`);
        }
      } catch (error) {
        interaction.reply(`Nezdarilo sa... Chyba: ${error}`);
        console.log(error);
      }
    }
  }
});

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DATABASE_STRING);
    console.log("Pripojivší k databáze");

    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error(error);
  }
})();
