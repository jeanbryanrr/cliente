import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from './services/websockets.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cliente';

  constructor(public chat: ChatService
  ) {

  }
  ngOnInit() {
    this.chat.getMessagesPrivate().subscribe(res => {
      console.log(res);
    });
  }
}
