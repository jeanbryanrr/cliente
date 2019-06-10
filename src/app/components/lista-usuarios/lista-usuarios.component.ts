import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from '../../services/websockets.service';
import { Usuario } from '../../classes/usuario';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuario: Usuario;
  constructor(chat: ChatService) { this.usuario = chat.getUsuario(); }

  ngOnInit() {
  }

}
