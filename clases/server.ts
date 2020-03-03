import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import sockectIO from 'socket.io';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: sockectIO.Server;
    private httpServer: http.Server;
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = sockectIO(this.httpServer);
        this.esucharSockets();
    }



    public static get instance() {

        return this._instance || (this._instance = new this());
    }
    private esucharSockets() {
        console.log('escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('nueov cliente conectado');

            //desconectar
            socket.desconectar(cliente);


        });
    }


    start(callback: any) {

        this.httpServer.listen(this.port, callback);

    }

}