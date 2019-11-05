import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recomment',
  templateUrl: './recomment.component.html',
  styleUrls: ['./recomment.component.css']
})
export class RecommentComponent implements OnInit {
  imgList: String[] = [];
  discList: any[];

  constructor (
    private _api: ApiService
  ) {
    this.getImgList()
      .subscribe(val => {
        this.imgList = val;
      });

    this.getDiscList()
      .subscribe(val => {
        this.discList = val;
      })
  };

  ngOnInit () {
    // this._api.getRecommend().subscribe();
    this._api.getDiscList().subscribe();
    // this._api.getSingerList().subscribe();
    // this._api.getSongList('7041144776').subscribe();
    // this._api.getSingerDetail('002J4UUk29y8BY').subscribe();
    // this._api.getLyric('002xx1zF1WXRs4').subscribe();
    // this._api.getTopList().subscribe();
    // this._api.getMusicList('4').subscribe();
    // this._api.getHotKey().subscribe();
    // this._api.search('赵雷', 1, true, 20).subscribe();
    // this._api.setSongsUrl([{mid: "003G9ZSa4REsPc"}]).subscribe();
  }

  getImgList (): Observable<any[]> {
    return this._api.getRecommend()
    .pipe(
      map(val => val.map(item => item.picUrl))
    );
  }

  getDiscList (): Observable<any[]> {
    return this._api.getDiscList();
  }
}