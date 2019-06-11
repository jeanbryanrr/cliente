import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { ChatService } from '../../services/chat.service';
import { WebsocketsService } from 'src/app/services/websockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  usuario: Usuario = null;
  constructor(private chat: WebsocketsService) { }

  ngOnInit() {
    this.usuario = this.chat.getUsuario();
    console.log('mmmm', this.chat.getUsuario());

  }

  logout() {
    this.chat.logoutWS();
  }

}
