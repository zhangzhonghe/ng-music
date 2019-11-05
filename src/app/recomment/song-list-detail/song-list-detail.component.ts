import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

@Component({
  selector: 'app-song-list-detail',
  templateUrl: './song-list-detail.component.html',
  styleUrls: ['./song-list-detail.component.css']
})
export class SongListDetailComponent implements OnInit {
  cover: String = 'https://p.qpic.cn/music_cover/3MLTH2k3HibTypyQfrdDcnLtAerMxDthxqKdIhyeUrwfZ1JcSSCN49A/600?n=1';
  showBg: boolean = false;

  constructor(
    private _location: Location
  ) { }

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

}