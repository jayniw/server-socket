import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
}

//obtener mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {
  // recibe el mensaje de cliente
  cliente.on('mensaje', (payload:{de:string,cuerpo:string})=>{
    console.log('mensaje recibido',payload);
    // emite el mensaje a todos los conectados
    io.emit('mensaje-nuevo',payload);
  });
}

//configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('configurar-usuario', ( payload:{nombre:string}, callback: Function) => {
    console.log('Configurando usuario',payload.nombre);
    callback({
      ok:true,
      mensaje:`Usuario ${ payload.nombre }, configurado`
    });
  });
}