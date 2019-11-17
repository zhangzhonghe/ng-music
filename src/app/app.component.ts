import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'a-music',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor (
    private _api: ApiService,
    private _player: PlayerService
  ) {
  };

  get currentSong () {
    return this._player.currentSong;
  }

  get showNormalPlayer () {
    return this._player.showNormalPlayer;
  }

  get showMiniPlayer () {
    return this._player.showMiniPlayer;
  }

  onHiddenPlayer () {
    this._player.showNormalPlayer = false;
  }

}
