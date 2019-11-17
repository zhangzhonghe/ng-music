import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { PlayerService } from '../services/player.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  currentTab = 'like';
  emptyContent = '暂无收藏歌曲';
  
  constructor(
    private _location: Location,
    private _user: UserService,
    private _player: PlayerService,
    private _api: ApiService
  ) {}

  ngOnInit() { }

  get songList () {
    if (this.currentTab === 'like') return this._user.getLikeList();
    if (this.currentTab === 'history') return this._user.getRecentList();
  }

  onSelectedLike () {
    this.currentTab = 'like';
    this.emptyContent = '暂无收藏歌曲';
  }

  onSelectedRecent () {
    this.currentTab = 'history';
    this.emptyContent = '你还没有听过歌曲';
  }

  onPlaySong (index) {
    this._api.setSongsUrl(this.songList).subscribe(songs => {
      this._player.currentList = songs;
      this._player.playSong(index);
    });
  }

  onPlayAll () {
    this._api.setSongsUrl(this.songList).subscribe(songs => {
      this._player.currentList = songs;
      this._player.playAll();
    });
  }

  onBack () {
    this._location.back();
  }
}