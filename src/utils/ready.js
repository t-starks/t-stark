const colors = require('colors');

/**
 * Muestra un banner personalizado en la consola.
 * @param {Object} client - La instancia del cliente de Discord.js autenticado.
 */
function showReady(client) {
  if (!client || !client.user) {
    throw new Error("Debes pasar una instancia válida del cliente de Discord.js.");
  }

  console.clear();
  console.log(colors.cyan(`
    _____   ____  _             _    
   |_   _| / ___|| |_ __ _ _ __| | __
     | |   \\___ \\| __/ _\` | '__| |/ /
     | |_   ___) | || (_| | |  |   < 
     |_(_) |____/ \\__\\__,_|_|  |_|\\_\\
  ╔════════════════════════════════════════════╗
   🤖 ${client.user.username} | 📱 ${client.slashCommands?.size || 0} Slash commands
   ✅  Access given by: https://starkcompany.netlify.app
   💻 Developed by: https://t-stark.netlify.app
  ╚════════════════════════════════════════════╝
  `));
}

module.exports = showReady;
