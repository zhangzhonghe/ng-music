import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() showLyric = false;
  @Output() closed: EventEmitter<undefined> = new EventEmitter();
  @ViewChild('audio', { static: false }) audio: ElementRef;

  constructor(
    private _player: PlayerService
  ) { }

  ngOnInit() {
    this._player.playing$.subscribe(() => this.onPlayOrPause());
  }

  get currentSong () {
    return this._player.currentSong;
  }

  get playMode (): string {
    return this._player.playMode;
  }

  get progress () {
    return this._player.progress;
  }

  get playing () {
    return this._player.playing;
  }

  onPlayOrPause () {
    if (this._player.playing) this.audio.nativeElement.pause();
    else  this.audio.nativeElement.play();
  }

  onSwitchMode () {
    this._player.switchMode();
  }

  onSwitchFavorite () {
    this._player.switchFavorite();
  }

  onPrevSong() {
    this._player.playPrevSong();
  }

  onNextSong() {
    this._player.playNextSong();
  }

  onChangedProgress (val: number) {
    this._player.currentTime = val * this.currentSong.duration;
    this.audio.nativeElement.currentTime = this._player.currentTime;
    this.audio.nativeElement.play();
  }

  onSwitchLyric () {
    this.showLyric = !this.showLyric;
  }

  onCanPlay () {
    this.audio.nativeElement.play();
  }

  onPlaying () {
    this._player.playing = true;
  }

  onPause () {
    this._player.playing = false;
  }

  onEnded () {
    this._player.playNextSong();
  }

  onTimeUpdate (e) {
    this._player.currentTime = e.target.currentTime;
  }

  onClose () {
    this.closed.emit();
  }

}