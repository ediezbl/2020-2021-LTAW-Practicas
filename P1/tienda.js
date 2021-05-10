
// Importando los modulos 
const http = require('http');
const fs = require('fs');
let path = require('path');
const port = 9000;
// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Extrayendo la ruta del archivo pedido
    let fileRoute = '.' + ((req.url == '/')?'tienda.html':req.url);
    // Ahora extraer la extension 
    let ext = path.extname(fileRoute);
    let contentType = 'text/html' // Esto es el tipo de archivo que va a servir por defecto
    // Ahora miramos los diferentes tipos de archivos disponibles 
    switch(ext) {
        case '.css':
            contentType = 'text/css'
    }
    // Voy a leer los archivos del sistema de ficheros 
    fs.readFile(fileRoute, 'utf8', (err, data) => {
        if (err) { // Si ha ocurrido algun error como por ejemplo el fichero no existe
            console.log("Error!!");
            console.log(err.message);
        } else { // no hay error, se produce la lectura normal
            console.log("Lectura completada...");
            res.writeHead(200, 'Content-Type', contentType);
            res.write(data);
            res.end();
        }
    });

});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + puerto);