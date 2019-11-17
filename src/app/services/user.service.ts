import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private _likeList = [];
  private _recentList = [];
  private _searchHistoryList = [];

  constructor() { }

  getLikeList () {
    this._likeList = this._getDataFromStorage('likeList');
    return this._likeList;
  }

  getRecentList () {
    this._recentList = this._getDataFromStorage('recentList');
    return this._recentList;
  }

  getSearchHistoryList () {
    this._searchHistoryList = this._getDataFromStorage('searchHistoryList');
    return this._searchHistoryList;
  }
  addSongToLikeList (song) {
    this._likeList.unshift(song);
    this._setDataForStorage('likeList', this._likeList);
  }

  addSongToRecentList (song) {
    let index = this.getIndexInRecentList(song);
    if (index || index === 0) {
      this.deleteSongOfRecentList(index);
    };
    
    this._recentList.unshift(song);
    this._setDataForStorage('recentList', this._recentList);
  }

  addSongToSearchHistoryList (text) {
    this._searchHistoryList = this._searchHistoryList.filter(item => item !== text);  // 删除重复的
    this._searchHistoryList.unshift(text);
    this._setDataForStorage('searchHistoryList', this._searchHistoryList);
  }

  deleteSongOfLikeList (index) {
    this._likeList.splice(index, 1);
    this._setDataForStorage('likeList', this._likeList);
  }

  deleteSongOfRecentList (index) {
    this._recentList.splice(index, 1);
    this._setDataForStorage('recentList', this._recentList);
  }

  deleteSongOfSearchHistoryList (index) {
    this._searchHistoryList.splice(index, 1);
    this._setDataForStorage('searchHistoryList', this._searchHistoryList);
  }

  clearSearchHistory () {
    this._searchHistoryList = [];
    this._setDataForStorage('searchHistoryList', this._searchHistoryList);
  }

  private _getDataFromStorage (key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  private _setDataForStorage (key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  getIndexInLikeList (song) {
    let index;
    this.getLikeList().forEach((item, i) => {
      if (item.id === song.id) index = i;
    });
    return index;
  }

  getIndexInRecentList (song) {
    let index;
    this.getRecentList().forEach((item, i) => {
      if (item.id === song.id) index = i;
    });
    return index;
  }
}