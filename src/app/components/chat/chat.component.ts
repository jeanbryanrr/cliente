import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Usuario } from '../../classes/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto: string = '';
  chatMensajeSubs: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;
  usuario: Usuario;
  constructor(public chat: ChatService) {

  }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.chatMensajeSubs = this.chat.getMessage().subscribe(mensaje => {

      this.mensajes.push(mensaje);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });

    this.chat.getMessagesPrivate().subscribe((res: any) => {
      this.mensajes.push(res);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  ngOnDestroy() {
    this.chatMensajeSubs.unsubscribe();
  }
  enviar() {

    if (this.texto.trim().length === 0) {
      return;
    }
    console.log(this.texto);
    this.chat.sendMesagge(this.texto);
    this.texto = '';
  }

}
