import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  hotkey = [];
  searchText = '';

  constructor(
    private _api: ApiService,
    private _user: UserService,
    private _modal: ModalService
  ) {
    this.getHotKey().subscribe(val => {
      this.hotkey = val;
    });
  }

  ngOnInit() {
  }

  get showLoading () {
    return this._api.showLoading;
  }

  get searchHistory () {
    return this._user.getSearchHistoryList() || [];
  }

  getHotKey () {
    return this._api.getHotKey();
  }

  onSearch (text: string) {
    this.searchText = text;
  }

  onDeleteSearchHistory (index) {
    this._user.deleteSongOfSearchHistoryList(index);
  }

  onClearHistory () {
    this._modal.showConfirm({
      content: '是否清空所有搜索历史',
      onCancel: () => this._modal.confirm = false,
      onConfirm: () => {
        this._user.clearSearchHistory();
        this._modal.confirm = false;
      }
    })
  }
}