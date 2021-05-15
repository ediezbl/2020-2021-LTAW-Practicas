
// Acceder a los ficheros del sistema 
const fs = require('fs');

// Fichero JSON que vamos a leer 
const FICHERO_JSON = 'tienda.json';

// Leer el fichero JSON 
const tienda_json = fs.readFileSync(FICHERO_JSON);

// Creando la estructura tienda a partir del fichero JSON
const tienda = JSON.parse(tienda_json);

// Incrementar el stock de los productos en una unidad 
tienda[0].productos.forEach((element, index) => {
    element["stock"] +=1
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});

// Convirtiendo la variable a cadena JSON 
let myJSON = JSON.stringify(tienda);

// Guardarla en el fichero destino 
fs.writeFileSync(FICHERO_JSON, myJSON);

console.log("Informacion guardada en fichero: " + FICHERO_JSON);