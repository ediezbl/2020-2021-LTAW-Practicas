
// Importar el modulo FS 
const fs = require('fs');

console.log("Lectura asincrona de un fichero");

// Vamos a realizar la lectura asincrona 
fs.readFile('fich1.txt', 'utf8', (err, data) => {
    // Una vez que los datos estan disponibles 
    // Se muestran por la consola 
    console.log("Lectura completada ...");
    console.log("Contenido del fichero: \n");
    console.log(data);
});

console.log("Esperando al sistema de ficheros...");