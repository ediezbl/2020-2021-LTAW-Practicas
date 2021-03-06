
//-- Paquetes de node a impprtar 
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
console.log("Arrancando electron...");

// Constantes 
const PUERTO = 9000;

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;
// Crear una nueva aplicacion web 
const app = express();
//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

// Numero de clientes activos 
let clients = 0;
//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    const file = fs.readFileSync('./public/chat.html', 'utf-8');
    res.send(file);
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXION **'.yellow);
    clients += 1; // Aumenta el numero de clientes 
    socket.send("Bienvenido/a a mi chat");
    socket.broadcast.emit('message', 'Un nuevo usuario se ha unido al chat');
    // Enviar el numero de clientes al proceso de renderizado 
    win.webContents.send('clients', clients);
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXION TERMINADA **'.yellow);
    clients -= 1; // Disminuye el numero de clientes 
    // Enviar el numero de clientes al proceso de renderizado 
    win.webContents.send('clients', clients);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
    let message = "";
    switch (msg) {
        case '/help':
            message = "Comandos que pueden servirte de ayuda:" + "<br>" + 
                      "/help: Te mostrara los comandos disponibles" + "<br>" + 
                      "/list: Te dira el numero de usuarios conectados" + "<br>" + 
                      "/hello: El servidor te mandara un saludo" + "<br>" + 
                      "/date: El servidor te dira la fecha";
            socket.send(message);
            break;
        case '/list':
            message = "Numero de clientes activos: " + String(clients) + "<br>";
            socket.send(message);
            break;
        case '/hello':
            message = "Hola, soy el server, disfruta mandando los mensajes, aunque recuerda siempre con respeto" + "<br>";
            socket.send(message);
            break;
        case '/date':
            let date = new Date();
            message = date.toUTCString() + "<br>";
            socket.send(message);
            break;
        default:
            if (msg.startsWith("/")) {
                message = "Comando no disponible, utliza /help para ver los disponibles" + "<br>";
                socket.send(message);
            } else {
                // Enviar el mensaje al proceso de renderizado
                win.webContents.send('msg', msg);
                //-- Reenviarlo a todos los clientes conectados
                io.send(msg);
            }
            break;
    }
  });

});

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

  //-- Esperar a que la página se cargue y se muestre
  //-- y luego enviar el mensaje al proceso de renderizado para que 
  //-- lo saque por la interfaz gráfica
  win.on('ready-to-show', () => {
    let url = "http://" + ip.address() + ":" + PUERTO;
    win.webContents.send('url', url);
  });

});


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
electron.ipcMain.handle('test', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  // Enviando el mensaje de prueba a todos los usuarios conectados
  win.webContents.send('msg', msg);
  io.send(msg);
});
 
server.listen(PUERTO);

