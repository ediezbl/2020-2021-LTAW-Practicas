// Ejemplo de uso de arrays literales 

// Creando una lista (array) de cuatro elementos
const a = [1,3,5,7];

// Imprimir por pantalla el elemento 2
console.log("Elemento 2: " + a[2]);

// Recorriendo todos los elementos del array
for (i in a) {
    console.log(`a[${i}] = ${a[i]}`);
}

// Imprimir el numero total de elementos que contiene el array
console.log("Cantidad de elementos: " + a.length);
