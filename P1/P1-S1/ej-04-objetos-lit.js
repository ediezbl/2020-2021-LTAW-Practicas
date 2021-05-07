// Ejemplo para aprender como se definen y como se usan los 
// objetos literales 

// Definiendo un objeto con varias propiedades y valores 
const objeto1 = {
    nombre: "Objeto-1",
    valor: 10,
    test: true
};

// Primera forma de imprimir las propiedades de un objeto
console.log("Nombre: " + objeto1.nombre);
console.log("Valor: " + objeto1.valor);
console.log("Test: " + objeto1.test);

// Segunda manera de imprimir las propiedades de un objeto
console.log("");
console.log("Nombre: " + objeto1["nombre"]);
console.log("Valor: " + objeto1["valor"]);
console.log("Test: " + objeto1["test"]);

// Comprobando si un objeto tiene una propiedad 
if ("test" in objeto1){
    console.log("\nTiene propiedad test");
}

// Recorriendo todas las propiedades 
console.log("");
for (prop in objeto1){
    console.log(`Propiedad: ${prop} --> Valor: ${objeto1[prop]}`);
}

// Obtener constantes con las propiedades del objeto
const {nombre, valor} = objeto1

console.log("");
console.log("Nombre: " + nombre);
console.log("Valor: " + valor);