
const http = require('http');

const PUERTO = 8080;

const server = http.createServer((req,res) => {
    // Generando respuesta 
    // Codigo de error 404 no encontrado 
    res.statusCode = 404;
    res.statusMessage = "Not Found :-("
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el ANGRY Server\n");
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 5. Angry server!. Escuchando en puerto: " + PUERTO);
