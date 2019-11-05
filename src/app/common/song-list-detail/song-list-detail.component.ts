import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable } from 'rxjs';
import { pluck, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-song-list-detail',
  templateUrl: './song-list-detail.component.html',
  styleUrls: ['./song-list-detail.component.css']
})
export class SongListDetailComponent implements OnInit {
  cover: string = '';
  showBg: boolean = false;
  title: string = '';
  songs = [];

  constructor(
    private _route: ActivatedRoute,
    private _location: Location,
    private _api: ApiService
  ) {
    this.getSongList()
    .subscribe(val => {
      this.initData(val);
    })
  }

  ngOnInit() {
  }

  onScroll (e, coverHeight) {
    of(e)
    .pipe(
      pluck('target', 'scrollTop'),
      map(val => val >= coverHeight)
    )
    .subscribe(val => this.showBg = val);
  }

  onBack () {
    this._location.back();
  }

  getSongList (): Observable<any> {
    return this._api.getSongList(
      this._route.snapshot.paramMap.get('dissid')
    );
  }

  initData (data) {
    this.cover = data.logo;
    this.title = data.dissname;
    this._api.setSongsUrl(data.songlist)
    .subscribe(val => {
      this.songs = val;
    })
  }

}