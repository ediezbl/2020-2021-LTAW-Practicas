
const http = require('http');

const PUERTO = 8080;

// Texto HTML para la pagina principal 
const pagina_main = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">MI TIENDA</h1>
</body>
</html>
`

// Texto HTML de la pagina de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: red">
    <h1 style="color: white">ERROR!!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res) => {
    // Valores que tiene la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = pagina_main;
    // Analizar el recurso con el modulo URL 
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);
    // Si el recurso que estoy pidiendo no es el principal 
    // los valores por defecto de las variables van a cambiar 
    // Servimos la pagina de error 
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }
    // Generando la respuesta en funcion de las variables 
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type', 'text/html');
    res.write(page);
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 7. Escuchando en puerto: " + PUERTO);
