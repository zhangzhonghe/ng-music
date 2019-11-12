import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  
  constructor(
    private _player: PlayerService
  ) { }

  ngOnInit() { }

  get playMode (): string {
    return this._player.playMode;
  }

  get translatePlayMode () {
    if (this.playMode === 'sequence') return '顺序播放';
    if (this.playMode === 'loop') return '单曲循环';
    if (this.playMode === 'random') return '随机播放';
  }

  get currentList () {
    return this._player.currentList;
  }

  get currentIndex () {
    return this._player.currentIndex;
  }

  onSwitchPlayMode () {
    this._player.switchMode();
  }

  onClose () {
    this.close.emit();
  }

  onAddSong () {
    this.add.emit();
  }
}