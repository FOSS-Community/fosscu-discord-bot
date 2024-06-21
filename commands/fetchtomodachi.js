module.exports = {
    name: '!tomodachi',
    description: 'Displays all available commands',
    execute(message, args) {
        const commandList = [
            "- `!tomodachi`: Display the commands",
            "- `!xps`: Display the XPs of the members",
            "- `!issues`: Fetch and display open issues",
            "- `!members`: Fetch and display organization members"
        ].join('\n');

        const helpMessage = `Here are all available commands:\n${commandList}`;
        message.channel.send(helpMessage);
    },
};
