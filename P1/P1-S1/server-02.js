
const http = require('http');

// Definir el puerto que vamos a utilizar 
const PUERTO = 8080;

// Funcion de retrollamada de peticion recibida
function atender(req, res) {
    // Indicamos que se ha recibido una peticion 
    console.log("Peticion recibida!");
}

// Crear el servidor
// Se le pasa como argumento la funcion de retrollamada 
// La funcion createServer() se conecta con el evento 'request'
const server = http.createServer(atender);

// Activar el servidor 
server.listen(PUERTO);

console.log("Servidor activado. Escuchando en el puerto: " + PUERTO);
