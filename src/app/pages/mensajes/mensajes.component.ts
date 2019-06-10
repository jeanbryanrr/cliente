import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  usuario: Usuario;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.usuario = this.chat.getUsuario();
  }

}
