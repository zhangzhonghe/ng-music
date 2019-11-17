import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, state, query, group, keyframes } from '@angular/animations';
import { PlayerService } from '../services/player.service';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { Base64 } from 'js-base64';
import Lyric from 'lyric-parser';

@Component({
  selector: 'app-player',
  animations: [
    trigger('playerAnimation', [
      state('show', style({
        display: 'block'
      })),
      state('hidden', style({
        display: 'none'
      })),
      transition('hidden => show', [
        style({display: 'block'}),
        group([
          query('app-cd-circle', [
            animate(200, keyframes([
              style({transform: 'scale(0.2)', offset: 0}),
              style({transform: 'scale(1.1)', offset: 0.9}),
              style({transform: 'scale(1)', offset: 1})
            ]))
          ]),
          query('.normal-player-hd', [
            style({transform: 'translateY(-100%)'}),
            animate(200, style({transform: 'translateY(0)'}))
          ]),
          query('.normal-player-ft', [
            style({transform: 'translateY(160%)'}),
            animate(200, style({transform: 'translateY(0)'}))
          ]),
        ]),
      ]),
      transition('show => hidden', [
        group([
          query('app-cd-circle', [
            animate(200, keyframes([
              style({transform: 'scale(1)', offset: 0}),
              style({transform: 'scale(0.2)', offset: 1})
            ]))
          ]),
          query('.normal-player-background', [
            animate(200, keyframes([
              style({opacity: '1', offset: 0}),
              style({opacity: '0', offset: 1})
            ]))
          ]),
          query('.normal-player-hd', [
            animate(200, style({transform: 'translateY(-100%)'}))
          ]),
          query('.normal-player-ft', [
            animate(200, style({transform: 'translateY(160%)'}))
          ]),
        ])
      ]),
      transition('void => show', [
        style({display: 'block'}),
        group([
          query('app-cd-circle', [
            animate(200, keyframes([
              style({transform: 'scale(0.2)', offset: 0}),
              style({transform: 'scale(1.1)', offset: 0.9}),
              style({transform: 'scale(1)', offset: 1})
            ]))
          ]),
          query('.normal-player-hd', [
            style({transform: 'translateY(-100%)'}),
            animate(200, style({transform: 'translateY(0)'}))
          ]),
          query('.normal-player-ft', [
            style({transform: 'translateY(100%)'}),
            animate(200, style({transform: 'translateY(0)'}))
          ]),
        ])
      ])
    ]),
  ],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() showLyric = false;
  @Output() closed: EventEmitter<undefined> = new EventEmitter();
  @ViewChild('audio', { static: false }) audio: ElementRef;
  @ViewChild('lyricRef', { static: false }) lyricRef: ElementRef;
  private _currentSong = null;
  currentLyric = '';
  curNum = 0;
  @HostBinding('@playerAnimation')
  get plAnimation () {
    return this.showNormalPlayer ? 'show' : 'hidden';
  }

  constructor(
    private _player: PlayerService,
    private _user: UserService,
    private _api: ApiService
  ) {
    this._player.currentLyric$.subscribe(({lineNum, txt}) => {
      this.currentLyric = txt;
      this.curNum = lineNum;
      if (lineNum > 5) {
        this.scrollToCurrent();
      }
    });
  }

  ngOnInit() {
    this._player.playing$.subscribe(() => this.onPlayOrPause());
  }

  get currentSong () {
    const song = this._player.currentSong;
    if (!this._currentSong || this._currentSong.id !== song.id) {
      this._currentSong = song;
      this.setLyric(song.mid);
    }
    
    return song;
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

  get lyricList () {
    return this._player.lyric ? this._player.lyric.lines : [];
  }

  get showNormalPlayer () {
    return this._player.showNormalPlayer;
  }

  scrollToCurrent () {
    this.lyricRef.nativeElement.scrollTo({
      top: (this.curNum - 5) * 32,  // 每行高度32
      behavior: 'smooth'
    });
  }

  scrollToTop () {
    this.lyricRef.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  setLyric (mid) {
    this._api.getLyric(mid).subscribe(data => {
      this._player.lyric && this._player.lyric.stop();
      this._player.lyric = new Lyric(Base64.decode(data.lyric), this._player.lyricHandle.bind(this._player));
      this._player.lyric.play();
      this._player.lyric.seek(this._player.currentTime * 1000);
    });
  }

  onPlayOrPause () {
    if (this._player.playing) this.audio.nativeElement.pause();
    else  {
      this.audio.nativeElement.play();
      this.scrollToCurrent();
    };
  }

  onSwitchMode () {
    this._player.switchMode();
  }

  onSwitchFavorite () {
    this._player.switchFavorite(this.currentSong);
  }

  onPrevSong() {
    this._player.playPrevSong();
    this.scrollToTop();
  }

  onNextSong() {
    this._player.playNextSong();
    this.scrollToTop();
  }

  onChangedProgress (val: number) {
    this._player.currentTime = val * this.currentSong.duration;
    this.audio.nativeElement.currentTime = this._player.currentTime;
    this.audio.nativeElement.play();
  }

  onMoveProgress (val: number) {
    this._player.lyric && this._player.lyric.seek(val * this.currentSong.duration * 1000);
  }

  onSwitchLyric () {
    this.showLyric = !this.showLyric;
    if (this.showLyric) {
      setTimeout(() => this.scrollToCurrent(), 0);
    };
  }

  onCanPlay () {
    this.audio.nativeElement.play();
    this._player.lyric && this._player.lyric.seek(this._player.currentTime * 1000);
    this._user.addSongToRecentList(this.currentSong);
  }

  onPlaying () {
    this._player.playing = true;
    this._player.lyric && this._player.lyric.seek(this._player.currentTime * 1000);
  }

  onPause () {
    this._player.playing = false;
    this._player.lyric && this._player.lyric.stop();
  }

  onEnded () {
    if (this._player.playMode === 'loop')
      this.audio.nativeElement.play();
    else
      this._player.playNextSong();
  }

  onTimeUpdate (e) {
    this._player.currentTime = e.target.currentTime;
  }

  onClose () {
    this.closed.emit();
  }

}