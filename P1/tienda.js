
// Importando los modulos 
const http = require('http');
const fs = require('fs');

// Definiendo el puerto 
const port = 9000;

// Variables
let filename = "";
let contentType = "";

// Funciones 
function checkPath(path) {
    // Esto es una funcion que comprueba el path
    // En funcion del path, cambiara el nombre del archivo 
    // y el tipo de contenido, y posiblemente el codigo de respuesta.
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
        } else {
            filename = 'error.html';
            contentType = 'text/html'; 
        }
    }
}

function writeResponse(path, res) {
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
}
// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Formando la URL
    const url = new URL(req.url, 'http://' + req.headers['host']);
    path = url.pathname;
    console.log(path);
    // Llamar a check path
    checkPath(path);
    // Lamar a write response 
    writeResponse(path, res);
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);