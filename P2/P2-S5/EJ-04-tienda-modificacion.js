
// Lectura y modificacion de un fichero JSON 
const fs = require('fs');

// Nombre del fichero JSON a leer 
const FICHERO_JSON = "EJ-04-tienda-json-fich.json";

// Nombre del fichero JSON de salida 
const FICHERO_JSON_OUT = "EJ-04-tienda-modificacion.json";

// Leer el fichero JSON 
const tienda_json = fs.readFileSync(FICHERO_JSON);

// Creando la estructura de la tienda a partir del contenido 
// del fichero JSON
const tienda = JSON.parse(tienda_json);

// Modificar el nombre del producto 2
tienda[1]["nombre"] = "IceBeraker";

// Mostrar informacion sobre la tienda 
console.log("Productos de la tienda: " + tienda.length);

// Recorriendo el array de productos
tienda.forEach((element, index) => {
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});

// Convirtiendo la variable a cadena JSON 
let myJSON = JSON.stringify(tienda);

// Guardarla en el fichero destino 
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log("Informacion guardada en fichero: " + FICHERO_JSON_OUT);
