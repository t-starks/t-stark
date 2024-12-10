const fs = require('fs');
const Discord = require('discord.js');
const colors = require('colors');
require('dotenv').config();  // Cargar variables de entorno desde .env
const { loadCommands } = require('./utils/loadCommands');
const showReady = require('./utils/ready');
const presence = require('./utils/presence');

/**
 * Exporta las funcionalidades de la librería T-Stark.
 */
module.exports = {
  showReady,
  presence,
  initializeBot
};

/**
 * Función principal para inicializar el bot con configuración flexible
 */
function initializeBot(client) {
    let config = {};

    // Primero se intenta cargar desde config.json
    if (fs.existsSync('./config.json')) {
        config = require('./config.json');
    } 
    // Si no existe el archivo config.json, se cargan las variables desde el archivo .env
    else if (process.env.TOKEN && process.env.CLIENT_ID) {
        config = {
            token: process.env.TOKEN,
            CLIENT_ID: process.env.CLIENT_ID,
            prefix: process.env.PREFIX || '!' // Prefijo opcional, por defecto es "!"
        };
    } else {
        console.error(colors.red('Error: No se ha encontrado un archivo de configuración válido (config.json o .env).'));
        return;
    }

    // Verificar que el token y clientId estén presentes
    if (!config.token || !config.clientId) {
        console.error(colors.red('Error: El token y CLIENT_ID son necesarios.'));
        return;
    }

    // Obtener el prefijo desde config.json o .env, si no está se establece como predeterminado
    const prefix = config.prefix || '!';

    // Cargar los comandos con prefijo desde la carpeta `commands`
    loadCommands(client, prefix);

    // Cargar los comandos de barra (slash) desde la carpeta `slash_commands`
    client.slashCommands = new Discord.Collection();  // Nueva propiedad para comandos de barra

    fs.readdirSync('./slash_commands').forEach((commandFile) => {
        try {
            const command = require(`./slash_commands/${commandFile}`);
            if (command.data && command.data.name) {
                client.slashCommands.set(command.data.name, command);
            }
        } catch (error) {
            console.error(colors.red(`[Error] No se pudo cargar el comando ${commandFile}:`, error));
        }
    });

    // Registrar los comandos de barra en Discord
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const rest = new REST({ version: '9' }).setToken(config.token);

    (async () => {
        try {
            // Cambié client.commands a client.slashCommands aquí
            await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: client.slashCommands.map(command => command.data.toJSON()) }
            );
            console.log(colors.green('Comandos de barra registrados exitosamente.'));
        } catch (error) {
            console.error(colors.red('Error al registrar los comandos de barra:', error));
        }
    })();

    // Inicializar el bot con el token
    client.login(config.token);
}
