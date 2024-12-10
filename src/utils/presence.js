/**
 * Establece la presencia del bot.
 * @param {Object} client - La instancia del cliente de Discord.js autenticado.
 * @param {number} type - El tipo de presencia (1, 2, 3, 4).
 * @param {string} text - El texto que se mostrará en la presencia.
 */
function presence(client, type, text) {
    if (type === 1) {
      client.user.setPresence({
        activities: [{ name: text, type: 'PLAYING' }],
        status: 'online',
      });
    } else if (type === 2) {
      client.user.setPresence({
        activities: [{ name: text, type: 'WATCHING' }],
        status: 'idle',
      });
    } else if (type === 3) {
      client.user.setPresence({
        activities: [{ name: text, type: 'LISTENING' }],
        status: 'dnd', // Do Not Disturb
      });
    } else if (type === 4) {
      client.user.setPresence({
        activities: [{ name: text, type: 'COMPETING' }],
        status: 'invisible',
      });
    }
  }
  
  module.exports = presence;
  