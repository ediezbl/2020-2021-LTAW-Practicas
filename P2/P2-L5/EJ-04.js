// Importando los modulos 
const http = require('http');
const fs = require('fs');

// Definiendo el puerto 
const port = 9000;

// Leyendo el fichero JSON 
const FICHERO_JSON = 'tienda.json';
const tienda_json = fs.readFileSync(FICHERO_JSON);
const tienda = JSON.parse(tienda_json);

// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Variables
    let filename = "tienda.html";
    let contentType = "";
    let resCode = 200;
    let productos = "";
    let parrafo = "";
    // Formando la URL
    const url = new URL(req.url, 'http://' + req.headers['host']);
    path = url.pathname;
    console.log(path);
    if (path == '/productos') {
        filename = "productos.html"
        tienda[0].productos.forEach((element) => {
            productos += "Producto: " + element["nombre"] + "<br>";
        });
        parrafo = fs.readFileSync(filename,'utf-8');
    }
    if (path != '/favicon.ico') {
        // Si el path es distinto de favicon.ico 
        // entonces puedo empezar la lectura de archivos.
        fs.readFile(filename, (err, data) => {
            if (err) { // Si ha ocurrido algun error como por ejemplo el fichero no existe
                console.log("Error!!");
                console.log(err.message);
            } else { // no hay error, se produce la lectura normal
                if (filename == "productos.html") {
                    data = parrafo.replace('', productos)
                }
                console.log(contentType);
                console.log(filename)
                res.writeHead(resCode, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);