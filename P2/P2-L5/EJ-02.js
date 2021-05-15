
// Acceder a los ficheros del sistema 
const fs = require('fs');

// Fichero JSON que vamos a leer
const FICHERO_JSON = 'tienda.json';

// Leer el fichero JSON
const tienda_json = fs.readFileSync(FICHERO_JSON);

// Creando la estructura tienda a partir del fichero JSON
const tienda = JSON.parse(tienda_json);

// Mostrar el numero de usuarios que contiene la tienda 
console.log("Numero de usuarios: ", tienda[1].usuarios.length);

// Mostrar un listado con el numero de usuarios 
tienda[1].usuarios.forEach((element, index) => {
    console.log("Usuario: " + (index + 1) + ": " + element["username"]);
});

// Mostrar el numero de productos que contiene la tienda 
console.log("Numero de productos registrados: " + tienda[0].productos.length);

// Listado con el numero de productos
tienda[0].productos.forEach((element, index) => {
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});

// Mostrar el numero de pedidos pendientes 
console.log("Numero de pedidos pendientes: " + tienda[2].pedidos.length);

// Mostrar una descripcion del pedido
tienda[2].pedidos.forEach((element, index) => {
    console.log("Usuario: " + (index + 1) + ": " + element["username"]);
    console.log("Direccion: " + (index + 1) + ": " + element["direccion"]);
    console.log("Productos: " + (index + 1) + ": " + element["productos"]);
});

