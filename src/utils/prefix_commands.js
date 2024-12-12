const fs = require('fs');
const path = require('path');
const colors = require('colors');

function loadMessageCommands(client) {
    const commandsPath = path.resolve(process.cwd(), 'commands');
    if (!fs.existsSync(commandsPath)) {
        console.warn(colors.yellow('La carpeta "commands" no existe. Creándola...'));
        fs.mkdirSync(commandsPath);
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        try {
            const command = require(path.join(commandsPath, file));
            if (command.name) {
                client.commands.set(command.name, command);
            }
        } catch (error) {
            console.error(colors.red(`No se pudo cargar el comando con prefijo ${file}:`), error);
        }
    });

    client.on('messageCreate', async (message) => {
        if (!message.content.startsWith(client.prefix) || message.author.bot) return;

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(colors.red(`Error ejecutando el comando ${commandName}:`), error);
            message.reply('Hubo un error al ejecutar el comando.');
        }
    });
}

module.exports = { loadMessageCommands };