
// Crear una variable con la estructura definida 
// en un fichero JSON 
const fs = require('fs');
// Nombre del fichero JSON que  vamos a leer 
const FICHERO_JSON = "EJ-03-tienda-json-fich.json";

// Leer el fichero JSON
const tienda_json = fs.readFileSync(FICHERO_JSON);

// Creando la estructura de la tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

// Mostrando informacion sobre la tienda 
console.log("Productos en la tienda: " + tienda.length);

// Recorriendo el array de los productos
tienda.forEach((element, index) => {
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});