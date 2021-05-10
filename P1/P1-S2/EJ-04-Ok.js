
const http = require('http');

const PUERTO = 8080;

// Server : bucle principal de atencion a clientes
const server = http.createServer((req, res) => {
    // Happy server, generar respuestas 
    // Codigo: todo ok
    res.statusCode = 200;
    res.statusMessage = "OK :-)";
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy Server\n");
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo4. Happy Server listo!. Escuchando en el puerto: " + PUERTO);
