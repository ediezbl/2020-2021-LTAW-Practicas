
// Importando los modulos 
const http = require('http');
const fs = require('fs');

// Definiendo el puerto 
const port = 9000;

// Base de datos de la tienda 
const FICHERO_JSON = 'tienda.json';

// Funcion para obtener la cookie del usuario 
function get_user(req) {
    // Leer la cookie recibida 
    const cookie = req.headers.cookie;
    // Hay cookie 
    if (cookie) {
        // obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        // Variable para guardar el usuario 
        let user;
        // Recorrer todos los pares nombre-valor
        pares.forEach((element, index) => {
            // Obtener los nombre y valores por separado 
            let [nombre, valor] = element.split('=');
            // Leer el usuario 
            // Solo si el nombre es user 
            if (nombre.trim() === 'user') {
                user = valor;
            }
        });
        // Si la variable no esta asignada
        // se devuelve null 
        return user || null;
    }
}
// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Variables
    let filename = "";
    let contentType = "";
    let resCode = 200;
    let content = "";
    let user = "";
    let html_extra = "";
    let direccion = "";
    let tarjeta = 0;
    let user_name = get_user(req);
    //  Leyendo la base de datos de la tienda  
    const FICHERO_JSON = 'tienda.json';
    const tienda_json = fs.readFileSync(FICHERO_JSON);
    const tienda = JSON.parse(tienda_json);
    // Formando la URL
    const url = new URL(req.url, 'http://' + req.headers['host']);
    path = url.pathname;
    
    // Obteniendo los parametrod fr la url
    let name = url.searchParams.get('nombre');
    // Comprobar el path 
    if(path == '/') {
        filename = 'tienda.html';
        contentType = 'text/html';
    } else {
        filename = path.split('/')[1];
        switch(filename) {
            case 'barcelona.html':
                contentType = 'text/html';
                content = fs.readFileSync('barcelona.html', 'utf-8');
                break;
            case 'monza.html':
                contentType = 'text/html';
                content = fs.readFileSync('monza.html', 'utf-8');
                break;
            case 'monaco.html':
                contentType = 'text/html';
                content = fs.readFileSync('monaco.html', 'utf-8');
                break;
            case 'login.html':
            case 'formCompra.html':
                contentType = 'text/html';
                break;
            case 'tienda.html':
                contentType = 'text/html';
                filename = 'tienda.html';
                tienda[1].usuarios.forEach((element) => {
                    if (element["username"] == name) {
                        file = 'tienda.html';
                        content = fs.readFileSync(file, 'utf-8');
                        res.setHeader('Set-Cookie', 'user=' + name);
                        user = name;
                    }
                });
                direccion = url.searchParams.get('direccion');
                tarjeta = url.searchParams.get('tarjeta');
                if (direccion) {
                    // Si la direccion no es una cadena nula 
                    // Escribir en el fichero JSON los datos enviados desde el formulario
                    tienda[2]["direccion"] = direccion;
                    tienda[2]["tarjeta"] = Number(tarjeta);
                    // Esta linea cambiara, los productos los cogere desde el carrito, pero de momento 
                    // y para probar es una buena opcion
                    tienda[2]["productos"] = ["Barcelona"];
                     // Escribiendo en el fihero JSON
                     let myJSON = JSON.stringify(tienda);
                     fs.writeFileSync(FICHERO_JSON, myJSON);
                } 
                break;
            case 'tienda.css':
            case 'error.css':
            case 'barcelona.css':
            case 'monza.css':
            case 'monaco.css':
            case 'login.css':
            case 'form.css':
                contentType = 'text/css';
                break;
            case 'logo-f1.JPG':
            case 'circuito1.JPG':
            case 'circuito2.JPG':
            case 'circuito3.JPG':
            case 'meme.JPG':
                contentType = 'image/jpg';
                break;
            case 'login':
                filename = 'login.html';
                contentType = 'text/html';
                break;
            default:
                filename = 'error.html';
                contentType = 'text/html';
                resCode = 404;
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
                if (filename == 'tienda.html') {
                    if (user_name) {
                        content = fs.readFileSync('tienda.html', 'utf-8');
                        data = content.replace('Login', user_name);
                        data = data.replace('Login', ''); 
                        tienda[2]["username"] = user_name;
                        // Escribiendo en el fihero JSON
                        let myJSON = JSON.stringify(tienda);
                        fs.writeFileSync(FICHERO_JSON, myJSON);
                    }
                }
                if (filename == 'barcelona.html') {
                    html_extra = tienda[0]["productos"][0]["descripcion"];
                    data = content.replace('HTML_EXTRA', html_extra);
                }
                if (filename == 'monza.html') {
                    html_extra = tienda[0]["productos"][1]["descripcion"];
                    data = content.replace('HTML_EXTRA', html_extra);
                }
                if (filename == 'monaco.html') {
                    html_extra = tienda[0]["productos"][2]["descripcion"];
                    data = content.replace('HTML_EXTRA', html_extra);
                }
                res.writeHead(resCode, {'Content-Type': contentType});
                res.end(data);
            }
        });
    }
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);