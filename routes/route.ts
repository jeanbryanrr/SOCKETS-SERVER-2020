import { Router, Request, Response } from 'express';


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

  res.json({
    ok: true,
    cuerpo,
    de,
    id

  });
});


export default ROUTER;