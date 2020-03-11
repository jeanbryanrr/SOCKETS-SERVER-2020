import express from 'express';
import { SERVER_PORT, SERVER_IP } from '../global/environment';
import http from 'http';
import sockectIO from 'socket.io';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: sockectIO.Server;
    private httpServer: http.Server;
    private ip: string;
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.ip = SERVER_IP
        this.httpServer = new http.Server(this.app);
        this.io = sockectIO(this.httpServer);
        this.esucharSockets();
    }



    public static get instance() {

        return this._instance || (this._instance = new this());
    }
    private esucharSockets() {


        this.io.on('connection', cliente => {

            socket.conectarCliente(cliente);

            socket.mensaje(cliente, this.io);
            //desconectar
            socket.desconectar(cliente, this.io);
            socket.configurarUsuario(cliente, this.io);

        });
    }


    start(callback: any) {

        this.httpServer.listen(this.port, this.ip, callback);

    }

}