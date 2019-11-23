import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class PlayerService {
  showNormalPlayer = false;
  showMiniPlayer = false;
  private _currentList: Song[] = [];  // 当前正在播放的歌曲列表
  currentIndex = 0;
  playing = false;
  playModes: string[] = ['sequence', 'loop', 'random'];
  playModeIndex = 0;
  currentTime = 0;
  playing$ = new Subject<void>();
  currentLyric$ = new Subject<ActiveLyric>();
  lyric: any;

  constructor(
    private _user: UserService
  ) { }

  get currentList () {
    return this._currentList;
  }

  set currentList (newVal: Song[]) {
    const likeList = this._user.getLikeList();
    this._currentList = newVal.map(song => {
      song.favorite = likeList.some(fSong => song.id === fSong.id);
      return song;
    });
  }

  get currentSong () {
    return this.currentList[this.currentIndex];
  }

  get playMode (): string {
    return this.playModes[this.playModeIndex];
  }

  get progress (): number {
    if (this.currentSong)
      return this.currentTime / this.currentSong.duration;
    else
      return 0;
  }

  switchMode () {
    this.playModeIndex++;
    this.playModeIndex = this.playModeIndex % this.playModes.length;
  }

  switchFavorite (song: Song) {
    song.favorite = !song.favorite;
    if (song.favorite) {
      this._user.addSongToLikeList(song);
    } else {
      this._user.deleteSongOfLikeList(this._user.getIndexInLikeList(song));
    }
  }

  clearPlayList () {
    this._currentList = [];
    this.currentIndex = 0;
    this.closePlayer();
  }

  deleteSong (song: Song) {
    const currentSong = this.currentSong;
    this._currentList = this._currentList.filter(item => item.id !== song.id);
    this.currentIndex = this._currentList.findIndex(item => item.id === currentSong.id);  // 重新确认当前播放歌曲的索引
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this._currentList.length === 0) this.closePlayer();
  }

  closePlayer () {
    this.showNormalPlayer = false;
    this.showMiniPlayer = false;
    this.playing = false;
  }

  sequencePlay (num: number) {
    this.currentIndex = this.currentIndex + num;
    if (this.currentIndex < 0)
      this.currentIndex = this.currentList.length - 1;
    else
      this.currentIndex = this.currentIndex % this.currentList.length;
  }

  // loopPlay () {

  // }
  
  randomPlay () {
    this.currentIndex = Math.floor(Math.random() * this.currentList.length);
  }

  playPrevSong () {
    if (this.playMode === 'sequence') this.sequencePlay(-1);
    if (this.playMode === 'loop') this.sequencePlay(-1);
    if (this.playMode === 'random') this.randomPlay();
  }

  playNextSong () {
    if (this.playMode === 'sequence') this.sequencePlay(1);
    if (this.playMode === 'loop') this.sequencePlay(1);
    if (this.playMode === 'random') this.randomPlay();
  }

  playSong (index: number) {
    this.currentIndex = index;
    this.showNormalPlayer = true;
    this.showMiniPlayer = true;
  }

  playAll () {
    if (this.currentList.length === 0) return;
    
    this.playModeIndex = 2; // 随机播放
    this.randomPlay();
    this.showNormalPlayer = true;
    this.showMiniPlayer = true;
  }
}