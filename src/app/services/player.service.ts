import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PlayerService {
  showNormalPlayer = false;
  showMiniPlayer = false;
  currentList = [];  // 当前正在播放的歌曲列表
  currentIndex = 0;
  playing = false;
  playModes: string[] = ['sequence', 'loop', 'random'];
  playModeIndex = 0;
  currentTime = 0;
  playing$ = new Subject();

  constructor() { }

  get currentSong () {
    return this.currentList[this.currentIndex];
  }

  get playMode (): string {
    return this.playModes[this.playModeIndex];
  }

  get progress () {
    if (this.currentSong)
      return this.currentTime / this.currentSong.duration;
    else
      return 0;
  }

  switchMode () {
    this.playModeIndex++;
    this.playModeIndex = this.playModeIndex % this.playModes.length;
  }

  switchFavorite () {
    this.currentSong['favorite'] = !this.currentSong['favorite'];
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
}