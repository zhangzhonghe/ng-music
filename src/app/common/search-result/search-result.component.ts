import { Component, OnInit, Input } from '@angular/core';
import { of, Subject } from 'rxjs';
import { debounceTime, pluck, takeWhile } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { PlayerService } from '../../services/player.service';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
  @Input() showPlayer = true;
  @Input() showSinger = true;
  @Input()
  set text (newVal: string) {
    this._text = newVal;
    this.search$.next(newVal);
  };
  get text () {
    return this._text;
  };
  private _text = '';
  search$ = new Subject();
  resultList = [];
  singer = null;
  private _page = 1;
  
  constructor(
    private _player: PlayerService,
    private _api: ApiService,
    private _user: UserService,
    private _message: MessageService
  ) {
    this.search$.pipe(
      debounceTime(600)
    )
    .subscribe(text => {
      this._page = 1;
      this.resultList = [];

      text && this.getSearchData(text).subscribe(result => {
        this.setSearchData(result);
      });
    });
  }

  ngOnInit() {
    
  }

  get showLoading () {
    return this._api.showLoading;
  }

  getSearchData (text) {
    return this._api.search(text, this._page, true, 20);
  }

  setSearchData (result) {
    const zhida = result.zhida;

    if (zhida.type === 2) this.singer = zhida;
    else this.singer = null;

    this._api.setSongsUrl(result.song.list).subscribe(songs => {
      this.resultList = this.resultList.concat(songs);
    })
  }

  onScrollSearchResult (e) {
    of(e).pipe(
      pluck('target'),
      takeWhile((el: any) => el.scrollHeight - (el.offsetHeight + el.scrollTop) <= 1)
    )
    .subscribe(() => {
      if (this.showLoading) return;
      this._page++;
      this.getSearchData(this.text).subscribe(result => {
        this.setSearchData(result);
      })
    });
  }

  onSelectedSong (song) {
    this.addNewSong(song);
    this._user.addSongToSearchHistoryList(this.text);
  }

  onSelectedSinger () {
    this._user.addSongToSearchHistoryList(this.text);
  }

  addNewSong (song) {
    if (this.showPlayer) {
      this._player.currentList = [...this._player.currentList, song];
      this._player.currentIndex = this._player.currentList.length - 1;
      this._player.showNormalPlayer = true;
      this._player.showMiniPlayer = true;
      this._player.playing$.next(); // 开始播放
    } else {

      // 添加到列表，但不进行播放
      this._player.currentList = [...this._player.currentList, song];
      this._message.showSuccess({content: '1首歌曲已添加到播放列表'});
    }
  }
}