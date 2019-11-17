import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-message',
  animations: [
    trigger('msgAnimation', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(200, style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate(200, style({transform: 'translateY(-100%)'}))
      ]),
    ])
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  constructor(
    private _message: MessageService
  ) { }

  ngOnInit() { }

  get show () {
    return this.success;
  }

  get success () {
    return this._message.success;
  }

  get content () {
    return this._message.content;
  }
}