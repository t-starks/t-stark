const { ActivityType } = require('discord.js');
/**
 * Configura la presencia del bot.
 * @param {Object} client client
 * @param {number} type - El tipo de actividad (0: Jugar, 1: Transmitir, 2: Escuchar, 3: Ver, 4: Personalizado, 5: Compitiendo).
 * @param {string} text - El texto de la presencia.
 */
function presence(client, type, text) {
    if (!client.user) {
        console.error('Error: El cliente no está autenticado correctamente.');
        return;
    }

    switch (type) {
        case 0: // Playing
            client.user.setPresence({
                status: 'online',
                activities: [{ name: text, type: ActivityType.Playing }]
            });
            break;
        case 1: // Streaming
            client.user.setPresence({
                status: 'online',
                activities: [{ name: text, type: ActivityType.Streaming }]
            });
            break;
        case 2: // Listening
            client.user.setPresence({
                status: 'online',
                activities: [{ name: text, type: ActivityType.Listening }]
            });
            break;
        case 3: // Watching
            client.user.setPresence({
                status: 'online',
                activities: [{ name: text, type: ActivityType.Watching }]
            });
            break;
        case 4: // Custom Status
            client.user.setPresence({
                status: 'online',
                activities: [{ name: text, type: ActivityType.Custom }]
            });
            break;
        case 5: // Competing
            client.user.setPresence({
                status: 'online',
                activities: [{ name: text, type: ActivityType.Competing }]
            });
            break;
        default:
            console.error('Error: Tipo de presencia inválido. Usa un valor entre 0 y 5.');
            return;
    }
}

module.exports = presence;