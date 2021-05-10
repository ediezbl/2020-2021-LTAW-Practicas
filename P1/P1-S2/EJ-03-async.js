
const http = require('http');

const PUERTO = 8080;

// Server : Bucle principal que atiende a clientes 
const server = http.createServer((req, res) => {
    console.log("\nMENSAJE A");
    req.on('data', (cuerpo) => {
        console.log("MENSAJE B")
    });
    req.on('end', () => {
        console.log("MENSAJE C");
        // Generando la respuesta del happy server 
        res.setHeader('Content-Type', 'text/plain');
        res.write("Soy el happy server\n");
        res.end();
    });
    console.log("MENSAJE D");
});
console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");