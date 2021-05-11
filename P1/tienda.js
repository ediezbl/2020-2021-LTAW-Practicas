
// Importando los modulos 
const http = require('http');
const fs = require('fs');
const port = 9000;

// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Formando la URL
    const url = new URL(req.url, 'http://' + req.headers['host']);
    path = url.pathname;
    console.log(path);
    let filename = "";
    let contentType = "";
    // Colocando el nombre del archivo y su contentType
    if(path == '/') {
        filename = 'tienda.html';
        contentType = 'text/html';
    } else {
        if (path == '/tienda.css') {
            filename = 'tienda.css';
            contentType = 'text/css'; 
        } else if (path == '/error.css'){
            filename = 'error.css';
            contentType = 'text/css';
        }else {
            filename = 'error.html';
            contentType = 'text/html'; 
        }
    }
    // Extrayendo la ruta del archivo pedido
    if (path != '/favicon.ico') {
        // Si el path es distinto de favicon.ico 
        // entonces puedo empezar la lectura de archivos.
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) { // Si ha ocurrido algun error como por ejemplo el fichero no existe
                console.log("Error!!");
                console.log(err.message);
            } else { // no hay error, se produce la lectura normal
                res.writeHead(200, {'Content-Type': contentType});
                res.write(data);
                res.end();
            }
        });
    }
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);