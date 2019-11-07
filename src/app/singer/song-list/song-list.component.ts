import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-song-list',
  templateUrl: 'song-list.component.html'
})

export class SongListComponent implements OnInit {
  cover: string = '';
  title: string = '';
  songs = [];
  
  constructor(
    private _route: ActivatedRoute,
    private _api: ApiService,
  ) {
    this.getSongList()
    .subscribe(val => {
      this.initData(val);
    })
  }

  ngOnInit() { }

  getSongList (): Observable<any> {
    const mid = this._route.snapshot.paramMap.get('mid');
    return this._api.getSingerDetail(mid);
  }

  initData (data) {
    this.cover = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.singer_mid}.jpg?max_age=2592000`;
    this.title = data.singer_name;
    this._api.setSongsUrl(data.list)
    .subscribe(val => {
      this.songs = val;
    })
  }
}