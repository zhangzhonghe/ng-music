import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() showLyric = false;
  @Output() closed: EventEmitter<undefined> = new EventEmitter();
  playing = false;
  private _playModes: string[] = ['sequence', 'loop', 'random'];
  private _playModeIndex = 0;
  @ViewChild('audio', { static: false }) audio: ElementRef;
  currentSong = {
    url: '',
    image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000',
    duration: 300,
    favorite: false,
  };
  currentTime = 0;

  constructor(
    private _api: ApiService
  ) { }

  ngOnInit() {
  }

  get playMode (): string {
    return this._playModes[this._playModeIndex];
  }

  get progress () {
    return this.currentTime / this.currentSong['duration'];
  }

  onPlayOrPause () {
    if (this.playing) this.audio.nativeElement.pause();
    else  this.audio.nativeElement.play();
  }

  onSwitchMode () {
    this._playModeIndex++;
    this._playModeIndex = this._playModeIndex % this._playModes.length;
  }

  onSwitchFavorite () {
    this.currentSong['favorite'] = !this.currentSong['favorite'];
  }

  onPrevSong() {
    
  }

  onNextSong() {

  }

  onProgressChanged (val: number) {
    this.currentTime = val * this.currentSong['duration'];
    this.audio.nativeElement.currentTime = this.currentTime;
    this.audio.nativeElement.play();
  }

  onSwitchLyric () {
    this.showLyric = !this.showLyric;
  }

  onPlaying () {
    this.playing = true;
  }

  onPause () {
    this.playing = false;
  }

  onTimeUpdate (e) {
    this.currentTime = e.target.currentTime;
  }

  onClose () {
    this.closed.emit();
  }

}