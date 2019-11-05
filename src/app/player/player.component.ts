import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

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
    url: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C4000016uoBq2TeOTE.m4a?guid=6370834024&vkey=6A4F255370DCF4CFBA6F146E9E173C29204331EA4A95F480CC4758198AE6E1E54381E00B99FC6F5E87D982140FC7C7921434666CA1A1A3A6&uin=0&fromtag=38',
    image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000',
    duration: 300,
    favorite: false,
  };
  currentTime = 0;

  constructor() { }

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