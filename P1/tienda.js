
// Importando los modulos 
const http = require('http');
const fs = require('fs');
const puerto = 9000;
let main_page;
// Leer el html utilizando el módulo fs
const file = 'tienda.html';
fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.log("Error");
        console.log(err.message);
    } else {
        console.log("Lectura Completada...");
        main_page = data;
    }
});

// Iniciando el servidor 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader('Content-Type', 'text/html');
    res.write(main_page);
    res.end();
});

server.listen(puerto);
console.log("Servidor tienda activado. Escuchando en el puerto: " + puerto);