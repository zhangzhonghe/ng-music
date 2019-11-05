import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'a-music',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  showNormalPlayer = false;

  constructor (
    private _api: ApiService
  ) {
  };

  get showLoading () {
    return this._api.showLoading;
  }

  onHiddenPlayer () {
    this.showNormalPlayer = false;
  }

}
