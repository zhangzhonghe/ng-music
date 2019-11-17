import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { PlayerService } from '../../services/player.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})

export class AddSongComponent implements OnInit {
  @Output() close = new EventEmitter();
  currentTab = 'recent-play';
  searchText = '';
  
  constructor(
    private _user: UserService,
    private _api: ApiService,
    private _player: PlayerService,
    private _message: MessageService
  ) { }

  ngOnInit() {
  }

  get recentList () {
    return this._user.getRecentList();
  }

  get searchHistoryList () {
    return this._user.getSearchHistoryList();
  }

  get showLoading () {
    return this._api.showLoading;
  }

  onSelectedRecentPlay () {
    this.currentTab = 'recent-play';
  }

  onSelectedSearchHistory () {
    this.currentTab = 'search-history';
  }

  onAddNewSong (song) {
    this._player.currentList = [...this._player.currentList, song];
    this._message.showSuccess({content: '1首歌曲已添加到播放列表'});
  }

  onClose () {
    this.close.emit();
  }

  trackByFn (index, song) {
    return song.id;
  }
}