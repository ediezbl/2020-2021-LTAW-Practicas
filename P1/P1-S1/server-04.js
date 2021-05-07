
const http = require('http');

// Definir el puerto a utilizar 
const PUERTO = 8080;

// Creando el servidor 
const server = http.createServer((req, res) => {
    // Indicar que la peticion ha sido recibida 
    console.log("Peticion recibida!");

    // Enviando la respuesta 
    // Siempre es la misma respuesta 
    // res.write() 
    // Esto hace que el mensaje se escriba directamente en el cuerpo
    res.write("Soy el Happy server!!\n");
    // Terminar la respuesta y enviarla 
    res.end();
});

// Activar el servidor 
server.listen(PUERTO);

console.log("Happy server activado!. Escuchando en puerto: " + PUERTO);