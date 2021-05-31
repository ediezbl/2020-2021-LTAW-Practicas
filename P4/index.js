const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");

// Variables 
let  clients = document.getElementById("clients");
let mensajes = document.getElementById("mensajes");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;


btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

//-- Mensajes recibido del proceso MAIN

electron.ipcRenderer.on('clients', (event, message) => {
    console.log("Recibido: " + message);
    clients.innerHTML = message;
  });

  electron.ipcRenderer.on('msg', (event, message) => {
    console.log("Recibido: " + message);
    mensajes.innerHTML += message + '<br>';
  });

electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });