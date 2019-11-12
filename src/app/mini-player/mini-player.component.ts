import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.css']
})

export class MiniPlayerComponent implements OnInit {
  showPlaylist = false;
  showAddSong = false;
  
  constructor(
    private _player: PlayerService
  ) { }

  ngOnInit() { }

  get currentSong () {
    return this._player.currentSong;
  }

  get playing () {  
    return this._player.playing;
  }

  onPlayOrPause () {
    this._player.playing$.next();
  }

  onShowPlaylist () {
    this.showPlaylist = true;
  }

  onCloseList () {
    this.showPlaylist = false;
  }

  onAddNewSong () {
    this.showAddSong = true;
  }

  onCloseAddSong () {
    this.showAddSong = false;
  }

  onShowNormalPlayer () {
    this._player.showNormalPlayer = true;
  }
}