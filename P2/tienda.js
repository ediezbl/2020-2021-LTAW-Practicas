
// Importando los modulos 
const http = require('http');
const fs = require('fs');

// Definiendo el puerto 
const port = 9000;
let carrito = "";
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

function get_productos(req) {
    // Leer la cookie recibida 
    const cookie = req.headers.cookie;
    // Hay cookie 
    if (cookie) {
         // obtener un array con todos los pares nombre-valor
         let pares = cookie.split(";");
         // Variable para guardar los productos, en este caso es una lista de productos  
         let products = [];
        // Recorrer todos los pares nombre-valor
        pares.forEach((element, index) => {
            // Obtener los nombre y valores por separado 
            let [nombre, valor] = element.split('=');
            // Leer el usuario 
            // Solo si el nombre es user 
            if (nombre.trim() === 'carrito') {
                valor.split(":").forEach((element) => {
                    products.push(element);
                });
            }
        });
        return products;
    }
}
// Iniciando el servidor 
const server = http.createServer((req, res) => {
    // Variables
    let filename = ""; // por defecto entrega la tienda
    let contentType = ""; // por defecto entrega texto html
    let resCode = 200;
    let content = "";
    let html_extra = "";
    let direccion = "";
    let tarjeta = 0;
    let user_name = "";
    //let products = get_productos(req);
    //  Leyendo la base de datos de la tienda  
    const FICHERO_JSON = 'tienda.json';
    const tienda_json = fs.readFileSync(FICHERO_JSON);
    const tienda = JSON.parse(tienda_json);
    // Formando la URL
    const url = new URL(req.url, 'http://' + req.headers['host']);
    path = url.pathname;
    
    // Obteniendo los parametrod de la url
    let name = url.searchParams.get('nombre');
    // Comprobar el path 
    if(path == '/') {
        filename = 'tienda.html';
    } else if (path == '/productos') {
        // Si el path es /productos voy a atender a la peticion AJAX
        contentType = "application/json";
        // obteniendo los parametros de la url
        let param1 = url.searchParams.get('param1');
        // pasarlo a minusculas porque mis productos estan en minuscula 
        param1 = param1.toLowerCase();
        // Rellenando un array con los productos de la tienda 
        let products = [tienda[0]["productos"][0]["nombre"],
                        tienda[0]["productos"][1]["nombre"], 
                        tienda[0]["productos"][2]["nombre"]];
        let result = [];
        // Recorrer el array de productos 
        for (let prod of products) {

            //-- Pasar a mayúsculas
            prodU = prod.toLowerCase();

            //-- Si el producto comienza por lo indicado en el parametro
            //-- meter este producto en el array de resultados
            if (prodU.startsWith(param1)) {
                result.push(prod);
            }
        }
         // Escribir en formato JSON 
         content = JSON.stringify(result);
         // Enviar la respuesta 
         res.writeHead(resCode, {'Content-Type': contentType});
         res.write(content);
         res.end();
    }else {
        filename = path.split('/')[1];
        switch(filename) {
            case 'tiendaAJAX.js':
                contentType = 'application/javascript';
                break;
            case 'barcelona':
                contentType = 'text/html';
                filename = 'barcelona.html'
                content = fs.readFileSync(filename, 'utf-8');
                if (carrito == "") {
                    // Si la cookie del carrito esta vacia 
                    carrito = 'carrito=Barcelona';
                } else {
                    carrito += ':Barcelona';
                }
                // Añadiendo la cookie
                res.setHeader('Set-Cookie', carrito);
                break;
            case 'monza':
                contentType = 'text/html';
                filename = 'monza.html'
                content = fs.readFileSync(filename, 'utf-8');
                if (carrito == "") {
                    carrito = 'carrito=Monza';
                } else {
                    carrito += ':Monza';
                }
                // Añadiendo la cookie
                res.setHeader('Set-Cookie', carrito);
                break;
            case 'monaco':
                contentType = 'text/html';
                filename = 'monaco.html'
                content = fs.readFileSync(filename, 'utf-8');
                if (carrito == "") {
                    carrito = 'carrito=Monaco';
                } else {
                    carrito += ':Monaco';
                }
                // Añadiendo la cookie
                res.setHeader('Set-Cookie', carrito);
                break;
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
            case 'confirmacionCompra.html':
                contentType = 'text/html';
                direccion = url.searchParams.get('direccion');
                tarjeta = url.searchParams.get('tarjeta');
                let productos = get_productos(req);
                if (direccion) {
                    // Si la direccion no es una cadena nula 
                    // Escribir en el fichero JSON los datos enviados desde el formulario
                    tienda[2]["direccion"] = direccion;
                    tienda[2]["tarjeta"] = Number(tarjeta);
                    // Esta linea cambiara, los productos los cogere desde el carrito, pero de momento 
                    // y para probar es una buena opcion
                    tienda[2]["productos"] = productos;
                     // Escribiendo en el fihero JSON
                     let myJSON = JSON.stringify(tienda);
                     fs.writeFileSync(FICHERO_JSON, myJSON);
                }
                break;
            case 'login.html':
            case 'formCompra.html':
                contentType = 'text/html';
                content = fs.readFileSync('formCompra.html', 'utf-8');
                break;
            case 'tienda.html':
                contentType = 'text/html';
                filename = 'tienda.html';
                tienda[1].usuarios.forEach((element) => {
                    if (element["username"] == name) {
                        file = 'tienda.html'
                        content = fs.readFileSync('tienda.html', 'utf-8');
                        res.setHeader('Set-Cookie', 'user=' + name);
                        user_name = name;
                    }
                });
                break;
            case 'tienda.css':
            case 'error.css':
            case 'barcelona.css':
            case 'monza.css':
            case 'monaco.css':
            case 'login.css':
            case 'form.css':
            case 'confirmacionCompra.css':
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
                contentType = 'text/html';
                filename = 'login.html';
                break;
            default:
                filename = 'error.html';
                contentType = 'text/html';
                resCode = 404;
                break;
        }
    }
    if (path != '/favicon.ico'){
        if (filename != "") {
            // Si el path es distinto de favicon.ico 
            // entonces puedo empezar la lectura de archivos.
            fs.readFile(filename, (err, data) => {
                if (err) { // Si ha ocurrido algun error como por ejemplo el fichero no existe
                    console.log("Error!!");
                    console.log(err.message);
                } else { // no hay error, se produce la lectura normal
                    if (filename == 'tienda.html') {
                        let user = get_user(req);
                        if (user) {
                            // Si ha encontrado el usuario, es decir, existia el campo con la cookie
                            console.log(user);
                            content = fs.readFileSync('tienda.html', 'utf-8');
                            data = content.replace('Login', user);
                            data = data.replace('/login', '');
                            tienda[2]["username"] = user;
                            // Escribiendo en el fihero JSON
                            let myJSON = JSON.stringify(tienda);
                            fs.writeFileSync(FICHERO_JSON, myJSON);
                        } else {
                            // Si no ha encontrado el campo con la cookie 
                            if (user_name) {
                                // Mirar si el usuario se acaba de registrar
                                data = content.replace('Login', user_name);
                                data = data.replace('/login', ''); 
                            } else {
                                // Si el usuario no esta registrado, o no se acaba de registrar 
                                // no se puede acceder al formulario de compra 
                                let content = fs.readFileSync('tienda.html', 'utf-8');
                                data = content.replace('formCompra.html', "");
                            }
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
                    if (filename == 'formCompra.html') {
                        let products = get_productos(req);
                        if (products[0] != []) {
                            products.forEach((element) => {
                                html_extra += element + " ";
                            });
                        } 
                        data = content.replace('HTML_EXTRA', html_extra);
                    }
                    res.writeHead(resCode, {'Content-Type': contentType});
                    res.end(data);
                }
            });
        }
    }
});

server.listen(port);
console.log("Servidor tienda activado. Escuchando en el puerto: " + port);