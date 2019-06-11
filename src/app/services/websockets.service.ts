import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService implements OnInit {
  public socketStatus = false;
  public usuario: Usuario = null;
  ngOnInit() {

  }

  constructor(private socket: Socket,private router: Router) {
    this.checkStatus()
    this.cargarStorage();
  }


  checkStatus() {

    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado al servidor');
      this.socketStatus = false;
    });
  }


  emit(evento: string, payload?: any, callback?: Function) {
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
    console.log('cfff');
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }

  }

  getUsuario() {

    return JSON.parse(localStorage.getItem('usuario'));

  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: ''
    }
    this.emit('configurar-usuario', payload,()=>{
      
    });
    this.router.navigate(['/login']);
  }
}
