import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService implements OnInit {
  public socketStatus = false;
  public usuario: Usuario;
  ngOnInit() {

  }

  constructor(private socket: Socket) {
    this.checkStatus
    this.cargarStorage();
  }


  checkStatus() {

    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado al servidor');
      this.socketStatus = false;
    });
  }


  emit(evento: string, payload: any, callback?: Function) {
    this.socket.emit(evento, payload, callback)
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (res) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  guardarStorage() {
    console.log(this.usuario);
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {

      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);

    }
  }

  getUsuario() {
    return this.usuario;
  }
}
