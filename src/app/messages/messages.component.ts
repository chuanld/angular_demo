import { Component, OnInit, OnChanges } from '@angular/core';
import { interval } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnChanges {
  constructor(public messageService: MessageService) {}
  timeInfo: number = 5;
  ngOnInit(): void {}
  ngOnChanges(): void {
    const dueTime = setInterval(() => {
      this.timeInfo = this.timeInfo - 1;
      if (this.timeInfo == -1) {
        clearInterval(dueTime);
        return;
      }
    }, 1000);

    setTimeout(() => {
      this.messageService.messages.splice(
        this.messageService.messages.length - 2,
        this.messageService.messages.length
      );
    }, 5000);
  }
}
