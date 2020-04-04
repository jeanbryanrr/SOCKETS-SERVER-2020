import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';
import { usuariiosConectado } from '../sockets/sockets';

const ROUTER = Router();
ROUTER.get('/mensajes', (req: Request, res: Response) => {

  res.json({
    ok: true,
    mensaje: 'todo esta bien gaa'
  });
});


ROUTER.post('/mensajes', (req: Request, res: Response) => {

  const pedido = req.body.pedido;

  const clienteId = req.body.pedido.usuario;
  const idPedido: number = parseInt(req.body.pedido_id);
  const modbuss = req.body.modbuss;
  const user = usuariiosConectado.getUsuarioPorIdUser(clienteId);
  const server = Server.instance;
  const userSocketId = user?.id;
  let socket = '';
  if (userSocketId !== undefined) {
    socket = userSocketId;
    server.io.in(socket).emit('escuchar-preparar-jugo', { idPedido, pedido, modbuss });
    res.json({
      ok: true,
      mensaje: 'ok!'
    });
  } else {
    res.json({
      estado: false,
      status: 500,
      mensaje: 'No se obtuvo el SocketId'
    });
  }


});


//service para obtener todos los ids
ROUTER.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        err: err
      });
    } else {
      res.json({
        ok: true,
        clientes
      });
    }
  });

});


//service para obtener todos los ids
ROUTER.get('/usuarios-detalle', (req: Request, res: Response) => {


  return res.json({
    ok: false,
    err: usuariiosConectado.getLista()
  });

});


export default ROUTER;