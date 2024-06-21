const fetch = require('node-fetch');
const { sendMessage } = require('../utils/sendMessage');

module.exports = {
    name: '!members',
    description: 'Fetch and display members of the organization',
    async execute(message, args) {
        const ORG_NAME = 'FOSS-Community';
        const url = `https://api.github.com/orgs/${ORG_NAME}/members`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }
        });
        const members = await response.json();

        let messageContent = '*Members:*\n';
        members.forEach(member => {
            messageContent += `- [${member.login}](https://github.com/${member.login})\n`;
        });

        sendMessage(message, messageContent);
    }
};
