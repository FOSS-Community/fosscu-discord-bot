const fetch = require('node-fetch');
const { sendMessage } = require('../utils/sendMessage');

module.exports = {
    name: '!members',
    description: 'Fetch and display open pull requests of the organization',
    async execute(message, args) {
        try {
            const ORG_NAME = 'FOSS-Community';
            const url = `https://api.github.com/search/issues?q=org:${ORG_NAME}+type:pr+state:open&per_page=100`;
            console.log('Request URL:', url);

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            const openPullRequests = result.items;
            let messageContent = '*Open Pull Requests:*\n';

            openPullRequests.forEach(pr => {
                messageContent += `- ${pr.repository_url.split('/').pop()}: [${pr.title}](${pr.html_url}), State - ${pr.state}, Created at - ${pr.created_at}, Author - ${pr.user.login}\n`;
            });

            sendMessage(message, messageContent);
        } catch (error) {
            console.error('Error fetching open pull requests:', error);
            sendMessage(message, 'An error occurred while fetching open pull requests.');
        }
    }
};
