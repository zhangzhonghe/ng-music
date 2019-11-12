import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private _likeList = [];
  private _recentList = [];
  private _searchHistoryList = [];

  constructor() { }

  getLikeList () {
    this._likeList = JSON.parse(localStorage.getItem('likeList')) || [];
    return this._likeList;
  }

  pushSongToLikeList (song) {
    this._likeList.push(song);
    localStorage.setItem('likeList', JSON.stringify(this._likeList));
  }

  getRecentList () {
    this._recentList = JSON.parse(localStorage.getItem('recentList')) || [];
    return this._recentList;
  }

  pushSongToRecentList (song) {
    this._recentList.push(song);
    localStorage.setItem('recentList', JSON.stringify(this._recentList));
  }

  getSearchHistoryList () {
    this._searchHistoryList = JSON.parse(localStorage.getItem('searchHistoryList')) || [];
    return this._searchHistoryList;
  }

  pushSongToSearchHistoryList (song) {
    this._searchHistoryList.push(song);
    localStorage.setItem('searchHistoryList', JSON.stringify(this._searchHistoryList));
  }
}