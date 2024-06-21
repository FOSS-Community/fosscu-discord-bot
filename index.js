require('dotenv').config();
const client = require('./discordClient');

client.login(process.env.BOT_TOKEN).catch(err => {
    console.error('Error logging in:', err);
});