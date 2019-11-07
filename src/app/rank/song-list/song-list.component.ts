import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
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
    const topid = this._route.snapshot.paramMap.get('topid');
    return this._api.getMusicList(topid);
  }

  initData (data) {
    this.cover = data.topinfo.pic_v12;
    this.title = data.ListName;
    this._api.setSongsUrl(data.songlist)
    .subscribe(val => {
      this.songs = val;
    })
  }
}