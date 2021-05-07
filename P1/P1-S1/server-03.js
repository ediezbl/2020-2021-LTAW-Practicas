
const http = require('http');

// Definir el puerto a utilizar 
const PUERTO = 8080;

// Crear el servidor.
// En este caso la funcion de retrollamada 
// se define dentro de los argumentos 
const server = http.createServer((req, res) => {
    // Aqui se indica que se ha recibido una peticion 
    console.log("Peticion recibida!");
});

// Activar el servidor 
server.listen(PUERTO);

console.log("Servidor activado. Escuchando en puerto: " + PUERTO);
