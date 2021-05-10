
// Importar el modulo fs
const fs = require('fs');

console.log("Lectura sincrona de un fichero");

// Realizar la lectura 
const data = fs.readFileSync('fich1.txt', 'utf8');

// Esta instruccion se va a ejecutar una vez que ha
// terminado la lectura sincrona 
console.log("Lectura completada");

// Vamos a mostrar el contenido del fichero
console.log("Contenido del fichero: \n");
console.log(data);

