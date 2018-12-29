import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";
//definir el server
const server = Server.instance;
//configurar bodyparser
server.app.use(bodyParser.urlencoded({ extended: true }) );
server.app.use(bodyParser.json());
//configurar CORS
server.app.use( cors({ origin:true, credentials:true }) );
//cargar las rutas de endpoints
server.app.use('/', router);
//subir servidor express
server.start( () => {
  console.log(`Servidor corriendo en el puerto ${ server.port }`);
  
})
