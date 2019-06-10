import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { WebsocketsService } from '../../services/websockets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public ws: WebsocketsService, private router: Router) { }
  nombre = '';
  public usuario: Usuario;
  ngOnInit() {
  }
  ingresar() {
    console.log(this.nombre);
    this.ws.loginWS(this.nombre).then(res => {
      this.router.navigate(['/mensajes']);
    });
  }
}
