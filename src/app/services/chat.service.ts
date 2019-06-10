import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  usuario: Usuario = null;
  constructor(public ws: WebsocketsService) {
    this.usuario = this.ws.usuario;
  }
  sendMesagge(mensaje: string) {
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

  getUsuario() {
    return this.usuario;
  }

  getMessagesPrivate() {
    return this.ws.listen('mensaje-privado');
  }
}
