//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const express = require('express');
const colors = require('colors');
const PUERTO = 9000;
//-- Crear una nueva aplciacion web
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
  
  console.log('** NUEVA CONEXIÓN **'.yellow);
    clients += 1; // Aumenta el numero de clientes 
    socket.send("Bienvenido/a a mi chat");
    socket.broadcast.emit('message', 'Un nuevo usuario se ha unido al chat');
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    clients -= 1; // Disminuye el numero de clientes 
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
                //-- Reenviarlo a todos los clientes conectados
                io.send(msg);
            }
            break;
    }
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);