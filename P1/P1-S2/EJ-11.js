
const fs = require('fs');

// Fichero que vamos a leer 
const FICHERO = 'fich11.txt';

fs.readFile(FICHERO, 'utf8', (err, data) => {
    if (err) { // Si ha ocurrido algun error como por ejemplo el fichero no existe
        console.log("Error!!");
        console.log(err.message);
    } else { // no hay error, se produce la lectura normal
        console.log("Lectura completada...");
        console.log("Contenido del fichero: \n");
        console.log(data);
    }
});