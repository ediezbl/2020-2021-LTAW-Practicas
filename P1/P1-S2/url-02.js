
// Construyendo el objeto URL
const myURL = new URL('http://localhost:8080/mi_tienda/listados.html?articulo=pendrive&color=blanco#descripcion');

// Imprimiendo la informacion de la URL
console.log("   * URL completa (href): " + myURL.href);
console.log("   * Origen: " + myURL.origin);
console.log("       * Protocolo: " + myURL.protocol);
console.log("       * host: " + myURL.hostname);
console.log("       * port: " + myURL.port);
console.log("   * Ruta: " + myURL.pathname);
console.log("   * Busqueda: " + myURL.search);

// Vamos a recorrer todas las busquedas 
myURL.searchParams.forEach((value, name) => {
    console.log("       * Parametro: " + name + "=" + value);
});

// Vamos a imprimir directamente todos los parametros 
console.log("       * Articulo: " + myURL.searchParams.get('articulo'));
console.log("       * Color: " + myURL.searchParams.get('color'));
console.log("       * Otro: " + myURL.searchParams.get('otro'));

// Imprimiendo la ultima parte el fragmento
console.log("   * Fragmento: " + myURL.hash);