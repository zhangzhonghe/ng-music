import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  confirm = false;
  confirmContent = '';
  
  constructor() { }

  showConfirm ({content, onConfirm, onCancel}: {content: string; onConfirm?: any; onCancel?: any}) {
    this.confirm = true;
    this.confirmContent = content;
    this.onConfirm = onConfirm || this.noop;
    this.onCancel = onCancel || this.noop;
  }

  onConfirm () {

  }

  onCancel () {

  }

  noop () {}
}