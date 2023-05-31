const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

app.use(cors())
//app.use(bodyParser());

const userRoute = require("./src/route/users/users.route");
const themeRoute = require("./src/route/themes/themes.route");
const topicRoute = require("./src/route/topics/topics.route");
const themes_properties = require ('./src/route/themes_properties/themes_properties.route');
//Ruta raiz

app.get('/', function (req, res) {
  console.log("Hola mundo desde el servidor");
  res.send('Hello World!');
});

//punto de entrada, route, para el url raiz, con el metodo GET
//request solicitud -> parametros -> argumentos
//responde -> respuesta -> resultado
app.get('/pagina2', function (req, res) {
    //logica
    //res.send('Study app');
    res.json({ 
      application: 'Study APP', version: '1.0.0' 
    });
  });

//Llamadas a los routes
userRoute(app);
themeRoute(app);
topicRoute(app);
themes_properties(app);

app.listen(3000);