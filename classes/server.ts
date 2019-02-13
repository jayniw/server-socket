import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server{
  //para patron singleton
  private static _instance : Server;

  public app: express.Application;
  public port: number;
  //propiedad de socket
  public io: socketIO.Server;
  //http
  private httpServer: http.Server;

  private constructor(){
    this.app = express();
    this.port = SERVER_PORT;
    //se debe usar http server porque socket IO no es compatible con express
    this.httpServer = new http.Server( this.app);
    //iniciar el socket
    this.io = socketIO( this.httpServer );

    this.escucharSockets();
  }

  //para patron singleton
  public static get instance(){
    return this._instance || (this._instance = new this());
  }

  private escucharSockets(){
    console.log('escuchando conexiones - sockets');
    this.io.on('connection', cliente => {
      //conectar cliente
      socket.conectarCliente(cliente);
      //configurar usuario
      socket.configurarUsuario(cliente, this.io);
      // mensajes
      socket.mensaje(cliente, this.io);
      
      //desconectar
      socket.desconectar(cliente);
      
    });
  }

  start(callback: Function ){
    this.httpServer.listen(this.port,callback);
  }
}