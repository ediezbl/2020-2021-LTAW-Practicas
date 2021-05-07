// Practicando el paso de parámetros a funciones 

// Suma, le doy dos parametros y los suma 
function suma(x,y) {
    // devolver la suma 
    return x+y;
}

// Recibe un parametro y lo imprime por la consola 
function mensaje(msg) {
    console.log(msg);
}

// Esta es una funcion que no recibe parametros 
function saluda() {
    mensaje("Hola!!!");
}

// Funcion que recibe una funcion como parametro
// y luego despues la llama
function call(func) {
    console.log("--> Funcion recibida");
    // Llamando a la funcion 
    func();
}

// Llamando a la funcion suma 
let a = suma(2,3);

// Probando la funcion mensaje 
mensaje("Prueba");
mensaje(a);

// Probando la funcion call 
call(saluda);

// Se le pasa como parametro una funcion 
// que se define dentro de los parametros 
// en ved de fuera 
call( () => {
    mensaje("Hola!!!");
})