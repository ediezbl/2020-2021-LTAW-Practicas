
const http = require('http');

// Definiendo el puerto
const PUERTO = 8080;

// Funcion que va a imprimir informacion sobre el mensaje de solicitud 
function print_info_req(req) {
    console.log("");
    console.log("Mensaje de solicitud");
    console.log("====================");
    console.log("Metodo: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("Version: " + req.httpVersion);
    console.log("Cabeceras: ");

    // Vamos a recorrer todas las cabeceras disponibles 
    // y vamos a imprimir su nombre y su valor 
    for (hname in req.headers) {
        console.log(`   * ${hname}: ${req.headers[hname]}`);
    }

    // Vamos a construir el objeto url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL completa: " + myURL.href);
    console.log("   Ruta: " + myURL.pathname);
}

// Servidor: Bucle principal que atiende peticiones de clientes 
const server = http.createServer((req, res) => {
    // Peticion recibida 
    // Vamos a imprimir la informacion de la peticion 
    print_info_req(req);
    // Si hay datos en el cuerpo se imprimen 
    req.on('data', (cuerpo) => {

        // Los datos que vienen en el cuerpo son caracteres 
        req.setEncoding('utf8');
        console.log("Cuerpo: ");
        console.log(`   * Tamaño: ${cuerpo.length} bytes`);
        console.log(`   * Contenido: ${cuerpo}`);
    });

    // Esta parte del codigo solo se ejecuta cuando se llega al final de la solicitud 
    req.on('end', () => {
        console.log("Fin del mensaje");
        // Generando la respuesta del servidor 
        res.setHeader('Content-Type', 'text/plain');
        res.write("Soy el happy server\n");
        res.end();
    });
});

// Poner al server a escuchar en el puerto
server.listen(PUERTO);

console.log("Ejemplo 2. Happy Server listo!. Escuchando en puerto: " + PUERTO);