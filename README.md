# FOSSCU_Tomodachi

The FOSSCU_Tomodachi is a FOSSCU-K Discord Bot is a versatile Discord bot designed to interact with GitHub and Airtable to fetch and display various organizational data such as members, open issues, pull requests, and XPs.

## Features

- Displays XPs of members
- Displays organization members
- Displays open issues
- Display the available commands

## Commands

- `!tomodachi`: Display the commands
- `!xps`: Display the XPs of the members
- `!issues`: Fetch and display open issues
- `!members`: Fetch and display organization members

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/FOSS-Community/fosscu-discord-bot.git
    cd fosscu-discord-bot
    ```


2. **Set Up GitHub Token**

    - Create a personal access token on GitHub with the necessary permissions to read organization members, repositories, issues, and pull requests and set up in the environment variables.

3. **Run Initialization Script**

    Execute the `init.sh` script to interactively set up the bot:

    ```bash
    npm i
    ```

4. **Start Server**

```bash
    npm start
    ```

    If installed nodemon as dev dependency 

    ```bash
    npm run dev
    ```


**Invite Discord Bot in your Server**

    

