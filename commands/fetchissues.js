const fetch = require('node-fetch');
const { sendMessage } = require('../utils/sendMessage');

module.exports = {
    name: 'fetchopenissues',
    description: 'Fetches open issues from a GitHub repository',
    async execute(message) {
        try {
            // Fetching open issues from a GitHub repository
            const response = await fetch('https://api.github.com/search/issues?q=org:FOSS-Community+type:issue+state:open&per_page=10');
            const data = await response.json();

            // Extracting the issues array
            const issuesArray = data.items;

            // Formatting the issues data
            const issues = issuesArray.map(issue => `- ${issue.title}: ${issue.html_url}`).join('\n');

            // Sending the formatted issues to the Discord channel
            sendMessage(message, issues);
        } catch (error) {
            console.error('Error fetching open issues:', error);
            throw new Error('An error occurred while fetching open issues.');
        }
    },
};
