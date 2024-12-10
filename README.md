# T-Stark

**T-Stark** es una librería para facilitar la creación de bots en Discord. Proporciona funcionalidades útiles para configurar y gestionar comandos, así como personalizar la interacción con el bot de manera sencilla.

## Características

- Carga de comandos con prefijo y comandos de barra (slash commands).
- Configuración flexible usando `config.json` o variables de entorno `.env`.
- Función para mostrar un banner personalizado en la consola cuando el bot está listo.
- Soporte para la gestión de presencia del bot.

## Instalación

### Usando npm

```bash
npm install t-stark
```

### Usando yarn

```bash
yarn add t-stark
```

## Requisitos

- Node.js v16.0.0 o superior.
- Una cuenta de bot en [Discord Developer Portal](https://discord.com/developers/applications).
- `discord.js` (automáticamente instalado como dependencia).

## Uso

### 1. Configuración del Bot

Antes de empezar, necesitas crear un archivo `config.json` o usar variables de entorno en un archivo `.env` para definir tu token y `clientId` de Discord.

#### Ejemplo de `config.json`:

```json
{
  "token": "TU_TOKEN_DEL_BOT",
  "CLIENT_ID": "TU_ID_DE_CLIENTE",
  "prefix": "!" 
}
```

#### Ejemplo de `.env`:

```env
TOKEN=TU_TOKEN_DEL_BOT
CLIENT_ID=TU_ID_DE_CLIENTE
PREFIX=!
```

### 2. Crear el Bot

En tu archivo principal de bot (`bot.js`), puedes importar y usar **T-Stark** para configurar tu bot:

```javascript
const Discord = require('discord.js');
const TStark = require('t-stark');

// Crear el cliente de Discord
const client = new Discord.Client();

// Inicializar el bot con T-Stark
TStark.initializeBot(client);

// Mostrar el login de inicio
client.once('ready', () => {
  TStark.showReady(client);
  console.log('Bot listo y en línea!');
});

// Iniciar sesión con el token
client.login('TU_TOKEN_DEL_BOT');
```

### 3. Comandos

#### Comandos con Prefijo

Coloca tus comandos con prefijo en la carpeta `commands/`. Los comandos deben exportar una función `execute(message, args)`.

#### Comandos Slash

Coloca tus comandos de barra en la carpeta `slash_commands/`. Cada comando debe tener un objeto `data` con un nombre único.

### 4. Funciones Útiles

- **`TStark.initializeBot(client)`**: Inicializa el bot con la configuración de comandos.
- **`TStark.showReady(client)`**: Muestra un banner de inicio personalizado en la consola cuando el bot está listo.

## Contribuir

Si deseas contribuir a la librería **T-Stark**, siéntete libre de abrir un "pull request" o reportar problemas a través de la sección de *Issues* en GitHub.

## Licencia

Este proyecto está cubierto por la Licencia de Uso Restringido v1.0. Consulte el archivo [LICENSE](./LICENSE) para más información.