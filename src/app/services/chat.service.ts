import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  usuario: Usuario;
  constructor(public ws: WebsocketsService) {

  }
  sendMesagge(mensaje: string) {
    this.usuario = this.ws.getUsuario();
    console.log(`emitiendo ${mensaje}`);
    const payload = {
      de: this.usuario.nombre,
      cuerpo: mensaje
    }
    this.ws.emit('mensaje', payload);

  }

  getMessage() {
    return this.ws.listen('mensaje-nuevo');
  }

  getMessagesPrivate() {
    return this.ws.listen('mensaje-privado');
  }
  getUsuariosActivos(){
    return this.ws.listen('usuarios-activos');

  }

  emitirUsuariosActivos(){
    this.ws.emit('obtener-usuario'); 
  }
}
