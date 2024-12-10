const fs = require('fs');

/**
 * Carga los comandos con prefijo y los de barra (slash).
 * @param {Object} client - La instancia del cliente de Discord.js autenticado.
 * @param {string} prefix - Prefijo que el bot utilizará para los comandos con prefijo.
 */
function loadCommands(client, prefix) {
    // Cargar los comandos con prefijo desde la carpeta `commands`
    loadMessageCommands(client, prefix);

    // Cargar los comandos de barra (slash) desde la carpeta `slash_commands`
    loadSlashCommands(client);
}

/**
 * Carga los comandos con prefijo desde el directorio `commands`.
 * @param {Object} client - La instancia del cliente de Discord.js autenticado.
 * @param {string} prefix - Prefijo configurado para los comandos.
 */
function loadMessageCommands(client, prefix) {
    fs.readdirSync('./commands')
        .filter(file => file.endsWith('.js'))
        .forEach(file => {
            const command = require(`../commands/${file}`);
            if (command.execute) {
                client.on('messageCreate', async (message) => {
                    if (message.author.bot) return;
                    if (!message.content.startsWith(prefix)) return;

                    const args = message.content.slice(prefix.length).trim().split(' ');
                    const commandName = args.shift().toLowerCase();

                    // Ejecutar el comando si el nombre coincide
                    if (commandName === file.split('.')[0]) {
                        try {
                            await command.execute(message, args);
                        } catch (error) {
                            console.error('Error al ejecutar el comando:', error);
                        }
                    }
                });
            }
        });
}

/**
 * Carga los comandos de barra (slash) desde el directorio `slash_commands`.
 * @param {Object} client - La instancia del cliente de Discord.js autenticado.
 */
function loadSlashCommands(client) {
    fs.readdirSync('./slash_commands').forEach((commandFile) => {
        try {
            const command = require(`../slash_commands/${commandFile}`);
            if (command.data && command.data.name) {
                client.commands.set(command.data.name, command);
            }
        } catch (error) {
            console.error(`No se pudo cargar el comando ${commandFile}:`, error);
        }
    });

    // Registrar los comandos de barra cuando el bot se conecta
    client.once('ready', async () => {
        const { REST } = require('@discordjs/rest');
        const { Routes } = require('discord-api-types/v9');
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        try {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: client.commands.map(command => command.data.toJSON()) }
            );
        } catch (error) {
            console.error('Error al registrar los comandos de barra:', error);
        }
    });
}

module.exports = { loadCommands };
