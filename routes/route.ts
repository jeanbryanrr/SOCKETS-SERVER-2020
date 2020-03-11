import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { Socket } from 'socket.io';

const ROUTER = Router();
ROUTER.get('/mensajes', (req: Request, res: Response) => {

  res.json({
    ok: true,
    mensaje: 'todo esta bien gaa'
  });
});


ROUTER.post('/mensajes/:id', (req: Request, res: Response) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;
  const payload = {
    de, cuerpo
  }
  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', payload);
  res.json({
    ok: true,
    cuerpo,
    de,
    id

  });
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



export default ROUTER;