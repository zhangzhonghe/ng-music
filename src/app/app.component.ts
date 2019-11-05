import { Component } from '@angular/core';

@Component({
  selector: 'a-music',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  showNormalPlayer: boolean = true;

  constructor () {
  };

  onHiddenPlayer () {
    this.showNormalPlayer = false;
  }

}
