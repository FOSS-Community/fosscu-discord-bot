const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const commandFiles = fs.readdirSync(__dirname) .filter(file => file.endsWith('.js') && file !== 'index.js');
    console.log('Command filea:', commandFiles);
    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        // Log the received message content
        console.log('Received message:', message.content);

        if (message.content.startsWith('!')) {
            const args = message.content.split(' ');
            const commandName = args.shift().substring(1).toLowerCase();

            // Log the extracted command name
            console.log('Command name:', commandName);

            const commandFile = commandFiles.find(file => file.startsWith("fetch"+commandName));

            // Log the found command file
            console.log('Command file:', commandFile);

            if (!commandFile) {
                // Log a message if the command file was not found
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
