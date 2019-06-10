import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketsService } from '../services/websockets.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  canActivate() {
    if (this.ws.getUsuario()) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
   
  }

  constructor(public ws: WebsocketsService,private router:Router) { }
}
