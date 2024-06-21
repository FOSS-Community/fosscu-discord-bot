var Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(process.env.BASE_ID);

async function fetchXPs() {
    return new Promise((resolve, reject) => {
        let allRecords = '';
        base('Table 1').select({
            view: 'XP Leaderboard'
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
                return reject(err);
            }
            resolve(allRecords);
        });
    });
}

module.exports = {
    name: '!xps',
    description: 'Displays the XPs of the members',
    execute: async (message) => {
        message.channel.send('Loading the data ⏳');
        try {
            const allRecords = await fetchXPs();
            message.channel.send(allRecords);
        } catch (error) {
            console.error('Error fetching XPs:', error);
            message.channel.send('Failed to load XP data.');
        }
    }
};
