
// Cargar el modulo de electron
const electron = require('electron');

console.log("Arrancando Electron ...");

// Variable para acceder a la ventana principal
// Se pone aqui para que sea global al modulo principal
let win = null;
// Punto de entrada. En cuanto electron este listo,
// Ejecuta esta funcion 
electron.app.on('ready', () => {
    console.log("Evento Ready!");
    // Crear la ventana principal de nuestra aplicacion 
    win = new electron.BrowserWindow ({
        width: 600, // Esto es la anchura 
        height: 400 // Esto es la altura 
    });

    // En la parte superior se ha creado el menu 
    // por defecto 
    // Si lo queremos quitar hay que añadir esta linea
    win.setMenuBarVisibility(false);
})
 

