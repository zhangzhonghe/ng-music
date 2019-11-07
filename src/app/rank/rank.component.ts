import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  topList = [];
  
  constructor(
    private _api: ApiService
  ) {
    this.getTopList().subscribe(val => {
      this.topList = val;
    })
  }

  ngOnInit() {
  }

  getTopList (): Observable<any[]> {
    return this._api.getTopList();
  }

}