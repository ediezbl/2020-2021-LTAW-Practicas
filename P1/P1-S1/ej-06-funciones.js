// Ejemplo para practicar la definicion de funciones 

// 4 funciones sin parametros 
// definidas de diferentes maneras 

// Definicion clasica 
function mi_funcion1 () {
    console.log("Mi funcion 1!!");
}

// Asignacion de una funcion a una variable 
const mi_funcion2 = function() {
    console.log("Mi funcion 2...");
}

// Misma manera de hacer lo anterior pero abreviado
const mi_funcion3 = () => {
    console.log("Mi funcion 3...");
}

// Definiendo funciones dentro de objetos literales 
const a = {
    x: 10, 
    f4: function() {
        console.log("Mi funcion 4!!!");
    },
    f5: () => {
        console.log("Mi funcion 5!!!");
    }
}

// Realizando llamadas a las funciones 
mi_funcion1();
mi_funcion2();
mi_funcion3();
a.f4();
a.f5();