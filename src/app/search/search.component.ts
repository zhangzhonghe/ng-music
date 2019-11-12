import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  hotkey = [];

  constructor(
    private _api: ApiService
  ) {
    this.getHotKey().subscribe(val => {
      this.hotkey = val;
    })
  }

  ngOnInit() {
  }

  getHotKey () {
    return this._api.getHotKey();
  }
  
}