import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.css']
})

export class MiniPlayerComponent implements OnInit, OnDestroy {
  showPlaylist = false;
  showAddSong = false;
  currentLyric = '歌词加载中';
  private _lyricSubscription: Subscription;
  
  constructor(
    private _player: PlayerService
  ) { }

  ngOnInit() {
    this._lyricSubscription = this._player.currentLyric$.subscribe(({txt}) => {
      this.currentLyric = txt;
    });
  }

  ngOnDestroy() {
    this._lyricSubscription.unsubscribe();
  }

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