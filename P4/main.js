
// Cargar el modulo de electron
const electron = require('electron');

console.log("Arrancando Electron ...");

// Punto de entrada. En cuanto electron este listo,
// Ejecuta esta funcion 
electron.app.on('ready', () => {
    console.log("Evento Ready!");
})