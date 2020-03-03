import Server from "./clases/server";
import bodyParser from 'body-parser';
import cors from 'cors';
import ROUTER from "./routes/route";



const server = Server.instance;
//bosy parser 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({ origin: true, credentials: true }));

//rutas
server.app.use('/', ROUTER);
server.start(() => {

    console.log(`server run ${server.port}`);
})


