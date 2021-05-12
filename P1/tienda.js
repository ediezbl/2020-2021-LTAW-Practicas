
// Importando los modulos 
const http = require('http');
const fs = require('fs');

// Definiendo el puerto 
const port = 9000;

// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Variables
    let filename = "";
    let contentType = "";
    // Formando la URL
    const url = new URL(req.url, 'http://' + req.headers['host']);
    path = url.pathname;
    console.log(path);
    // Comprobar el path 
    if(path == '/') {
        filename = 'tienda.html';
        contentType = 'text/html';
    } else {
        filename = path.split('/')[1];
        switch(filename) {
            case 'barcelona.html':
            case 'monza.html':
            case 'monaco.html':
            case 'tienda.html':
                contentType = 'text/html';
                break;
            case 'tienda.css':
            case 'error.css':
            case 'barcelona.css':
            case 'monza.css':
            case 'monaco.css':
                contentType= 'text/css';
                break;
            case 'logo-f1.JPG':
            case 'circuito1.JPG':
            case 'circuito2.JPG':
            case 'circuito3.JPG':
            case 'meme.JPG':
                contentType = 'image/jpg';
                break;
            default:
                filename = 'error.html';
                contentType = 'text/html';
                break;
        }
    }
    if (path != '/favicon.ico') {
        // Si el path es distinto de favicon.ico 
        // entonces puedo empezar la lectura de archivos.
        fs.readFile(filename, (err, data) => {
            if (err) { // Si ha ocurrido algun error como por ejemplo el fichero no existe
                console.log("Error!!");
                console.log(err.message);
            } else { // no hay error, se produce la lectura normal
                console.log(contentType);
                console.log(filename)
                res.writeHead(200, {'Content-Type': contentType});
                res.end(data);
            }
        });
    }
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);