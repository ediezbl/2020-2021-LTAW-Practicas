
const http = require('http');

// Creacion del servidor 
const server = http.createServer();

// Creación de la funcion de retrollamada 
// Cada vez que el cliente realiza una peticion
// El servidor llama a esta funcion 
function atender(req, res) {
    // req : Es el mensaje de solicitud 
    // res: Es el mensaje de respuesta 
    // Indicar por la consola que la peticion ha sido recibida 
    console.log("Petición recibida!");

    // Todavia no se envia la respuesta
}

// Activar la funcion de retrollamada del servidor 
server.on('request', atender);

// Activo el servidor para escuchar peticiones en el puerto 8080
server.listen(8080);