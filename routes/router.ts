import {Router,Response,Request} from 'express';

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
  res.json({
    ok:true,
    cuerpo,
    de,
    id
  });
});

export default router;