// Ejemplo para practicar como funcionan
// los temporizadores 

// Funcion a ejecutar tras un tiempo 
// Funcion de retrollamada del temporizador 
function tarea1() {
    console.log("Tarea 1 completada!");
}

// Llamada retardada mediante temporizador 
// Cuando transcurran 1000 ms se llama a tarea 1
setTimeout(tarea1, 1000);

// Aqui se incluye la funcion de retrollamada 
// directamente en el parametro en lugar de hacerlo fuera 
setTimeout(() => {
    console.log("Tarea 2 completada!");
}, 2000);

console.log("Esperando a que terminen las tareas");

// Funcion de retrollamada que se invoca cada 200 ms
// Se guarda su identificador en la variable id
// para luego posteriormente poder eliminarlo con ClearInterval
let id = setInterval(() => {
    console.log("Tic...");
}, 200);

// Despues de 3 segundos el temporizador se desactiva
setTimeout(() => {
    clearInterval(id);
    console.log("Stop!");
}, 3000);