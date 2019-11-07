import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-song-list-detail',
  templateUrl: './song-list-detail.component.html',
  styleUrls: ['./song-list-detail.component.css']
})
export class SongListDetailComponent implements OnInit {
  @Input() cover: string = '';
  @Input() title: string = '';
  @Input() songs = [];
  showBg: boolean = false;

  constructor(
    private _location: Location,
    private _api: ApiService
  ) { }

  ngOnInit() {
  }

  get showLoading (): boolean {
    return this._api.showLoading;
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