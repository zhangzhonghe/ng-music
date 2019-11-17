import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  animations: [
    trigger('showHidden', [
      transition(':enter', [
        animate(200, keyframes([
          style({transform: 'scale(0.6)', offset: 0}),
          style({transform: 'scale(1.1)', offset: 0.8}),
          style({transform: 'scale(1)', offset: 1})
        ]))
      ])
    ])
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  constructor(
    private _modal: ModalService
  ) { }

  ngOnInit() { }

  get show () {
    return this._modal.confirm;
  }

  get content () {
    return this._modal.confirmContent;
  }

  onCancel () {
    this._modal.onCancel();
  }

  onConfirm () {
    this._modal.onConfirm();
  }
}