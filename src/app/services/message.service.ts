import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  success = false;
  content = '';
  
  constructor() { }

  showSuccess ({content}: {content: string}) {
    this.success = true;
    this.content = content;
    this.timedClose();
  }

  timedClose (duration: number = 2000) {
    setTimeout(() => {
      this.success = false;
    }, duration);
  }
}