
// Importando los modulos 
const http = require('http');
const fs = require('fs');
let path = require('path');
const port = 9000;

// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Extrayendo la ruta del archivo pedido
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.write("Happy server");
    res.end();
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);