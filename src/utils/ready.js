const colors = require('colors');
const fs = require('fs');
const path = require('path');

function getSlashCommandsCount() {
    const slashCommandsPath = path.resolve(process.cwd(), 'slash_commands');
    if (!fs.existsSync(slashCommandsPath)) return 0;
    const commandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));
    return commandFiles.length;
}

function getPrefixCommandsCount() {
    const commandsPath = path.resolve(process.cwd(), 'commands');
    if (!fs.existsSync(commandsPath)) return 0;
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    return commandFiles.length;
}

function showReady(client) {
    const slashCommandsCount = getSlashCommandsCount();
    const prefixCommandsCount = getPrefixCommandsCount();

    console.clear();

    console.log(colors.cyan(`
        ╔══╗╔══╦╗     ╔╗
        ╚╗╔╝║══╣╚╦═╗╔╦╣╠╗
         ║╠╗╠══║╔╣╬╚╣╔╣═╣
         ╚╩╝╚══╩═╩══╩╝╚╩╝
    ╔════════════════════════════════════════════╗
     🤖 ${client.user.username} | 🔰 Slash: ${slashCommandsCount} 🔰 Prefix: ${prefixCommandsCount}
     💻 Developer: https://t-stark.netlify.app
     🏢 Tools: https://starkcompany.netlify.app
    ╚════════════════════════════════════════════╝
    `));
}

module.exports = showReady;
