const { Client, GatewayIntentBits } = require('discord.js');
const registerCommands = require('./commands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // console.log(client);
    registerCommands(client); 

});

module.exports = client;
