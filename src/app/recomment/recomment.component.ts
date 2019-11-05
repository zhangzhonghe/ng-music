import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recomment',
  templateUrl: './recomment.component.html',
  styleUrls: ['./recomment.component.css']
})
export class RecommentComponent implements OnInit {
  list: String[];

  constructor (
    private _api: ApiService
  ) {
    this.list = this.getList();
  };

  ngOnInit () {
    // this._api.getRecommend().subscribe();
    // this._api.getDiscList().subscribe();
    // this._api.getSingerList().subscribe();
    this._api.getSongList('7041144776').subscribe();
    // this._api.getSingerDetail('002J4UUk29y8BY').subscribe();
    // this._api.getLyric('002xx1zF1WXRs4').subscribe();
    // this._api.getTopList().subscribe();
    // this._api.getMusicList('4').subscribe();
    // this._api.getHotKey().subscribe();
    // this._api.search('赵雷', 1, true, 20).subscribe();
    this._api.setSongsUrl([{mid: "003G9ZSa4REsPc"}]).subscribe();
  }

  getList (): String[] {
    return [
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1788739.jpg',
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1788145.jpg',
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1781158.jpg',
      'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1788112.jpg'
    ]
  }
}