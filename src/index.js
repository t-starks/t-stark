const colors = require('colors');
const path = require('path');
const fs = require('fs');

const { loadMessageCommands } = require('./utils/prefix_commands');
const { loadSlashCommands } = require('./utils/slash_commands');
const showReady = require('./utils/ready');
const presence = require('./utils/presence');

module.exports = {
  showReady,
  presence,
  initializeBot
};

function initializeBot(client) {
    let config = {};

    // Detectar config.json o variables de entorno
    if (fs.existsSync('./config.json')) {
        config = require(path.resolve(process.cwd(), 'config.json'));
    } else {
        config = {
            token: process.env.TOKEN,
            clientId: process.env.CLIENT_ID,
            prefix: process.env.PREFIX || '!'
        };
    }

    if (!config.token || !config.clientId) {
        console.error(colors.red('Error: El token y CLIENT_ID son obligatorios. Configúralos en config.json o .env.'));
        return;
    }

    client.token = config.token;
    client.prefix = config.prefix || '!';
    client.commands = new Map(); // Almacena comandos con prefijo y slash

    // Cargar comandos
    loadMessageCommands(client);
    loadSlashCommands(client, config.clientId);

    client.login(config.token).catch(err => {
        console.error(colors.red('Error al iniciar sesión con el token proporcionado:'), err);
    });
};