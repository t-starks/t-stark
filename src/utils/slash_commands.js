const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const colors = require('colors');

function loadSlashCommands(client, clientId) {
    const slashCommandsPath = path.resolve(process.cwd(), 'slash_commands');
    if (!fs.existsSync(slashCommandsPath)) {
        console.warn(colors.yellow('La carpeta "slash_commands" no existe. Creándola...'));
        fs.mkdirSync(slashCommandsPath);
    }

    const commandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));
    const commands = [];

    commandFiles.forEach(file => {
        try {
            const command = require(path.join(slashCommandsPath, file));
            if (command.data && command.data.name) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            }
        } catch (error) {
            console.error(colors.red(`No se pudo cargar el comando slash ${file}:`), error);
        }
    });

    client.once('ready', async () => {
        const rest = new REST({ version: '9' }).setToken(client.token);

        try {
            await rest.put(Routes.applicationCommands(clientId), { body: commands });
            console.log(colors.green('Comandos slash registrados exitosamente.'));
        } catch (error) {
            console.error(colors.red('Error al registrar los comandos slash:'), error);
        }
    });
}

module.exports = { loadSlashCommands };
