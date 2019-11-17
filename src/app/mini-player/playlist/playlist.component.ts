import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  
  constructor(
    private _player: PlayerService,
    private _modal: ModalService
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

  onPlaySong (index) {
    this._player.currentIndex = index;
  }

  onSwitchPlayMode () {
    this._player.switchMode();
  }

  onSwitchFavorite (song) {
    this._player.switchFavorite(song);
  }

  onDeleteSong (song) {
    this._player.deleteSong(song);
  }

  onClose () {
    this.close.emit();
  }

  onAddSong () {
    this.add.emit();
  }

  onClear () {
    this._modal.showConfirm({
      content: '是否清空播放列表',
      onCancel: () => this._modal.confirm = false,
      onConfirm: () => {
        this._player.clearPlayList();
        this._modal.confirm = false;
      }
    })
  }
}