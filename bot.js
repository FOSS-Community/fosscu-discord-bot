require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(process.env.BASE_ID);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content === '!xps') {
        message.channel.send(`Loading the data ⏳ `);
        let allRecords = '';
        base('Table 1').select({
            view: "XP Leaderboard"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                const name = record.get('Name');
                const xp = record.get('XP');
                if (name && xp) {
                    allRecords += ` 🔥 ${name} : ${xp}\n`;
                }
            });
            fetchNextPage();

        }, function done(err) {
            if (err) {
                console.error(err);
                return;
            }

            message.channel.send(`${allRecords}`);
        });
    }
});

client.login(process.env.BOT_TOKEN);
