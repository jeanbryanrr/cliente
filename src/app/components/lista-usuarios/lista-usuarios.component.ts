import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from '../../services/websockets.service';
import { Usuario } from '../../classes/usuario';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuario: Usuario;
  usuariosActivosObs: Observable<any>;
  constructor(chat: WebsocketsService, public cs: ChatService) { this.usuario = chat.getUsuario(); }

  ngOnInit() {
    this.usuariosActivosObs = this.cs.getUsuariosActivos();
    this.cs.emitirUsuariosActivos();
  }

}
