import {Router,Response,Request} from 'express';
import Server from '../classes/server';

//definir router para los endpoints
const router = Router();

//endpoint GET de ruta mensajes
router.get('/mensajes',(req:Request,res:Response)=>{
  res.json({
    ok:true,
    mensaje:'Todo esta bien'
  });
});

// endpoint POST de ruta mensajes
router.post('/mensajes',(req:Request,res:Response)=>{
  //obtener lo enviado en el POST del endpoint
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  //payload del mensaje
  const payload = {
    de,
    cuerpo
  };
  //instanciar el server
  const server = Server.instance;
  //enviar el mansaje a los conectados
  server.io.emit('mensaje-nuevo', payload);
  res.json({
    ok:true,
    cuerpo,
    de
  });
});
// endpoint POST de ruta mensajes con parametro
router.post('/mensajes/:id',(req:Request,res:Response)=>{
  //obtener lo enviado en el POST del endpoint
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;
  //payload del mensaje
  const payload = {
    de,
    cuerpo
  };
  //instanciar el server
  const server = Server.instance;
  //enviar el mensaje al usuario id
  server.io.in(id).emit('mensaje-privado', payload);

  res.json({
    ok:true,
    cuerpo,
    de,
    id
  });
});

export default router;