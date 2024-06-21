const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const commandFiles = fs.readdirSync(__dirname) .filter(file => file.endsWith('.js') && file !== 'index.js');
    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        if (message.content.startsWith('!')) {
            const args = message.content.split(' ');
            const commandName = args.shift().substring(1).toLowerCase();

            const commandFile = commandFiles.find(file => file.startsWith("fetch"+commandName));
           

            if (!commandFile) {
                
                console.log(`Command file for "${commandName}" not found.`);
                return;
            }

            try {
                const command = require(path.join(__dirname, commandFile));
                await command.execute(message, args);
            } catch (error) {
                console.error(`Error executing command ${commandName}:`, error);
                message.reply('There was an error executing that command.');
            }
        }
    });
};
