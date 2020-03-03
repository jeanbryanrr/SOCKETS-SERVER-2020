import Server from "./clases/server";
import ROUTER from "./routes/route";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();
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