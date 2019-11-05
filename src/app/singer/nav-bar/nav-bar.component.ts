import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { pluck, map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private _list: any[];
  private _startY: number;
  private _activeIndex: number;
  activeIndex: any = 0;
  @Input()
  set list(list) {
    this._list = list.map(i => i.title[0]);
  };
  get list() {
    return this._list;
  };
  @Input()
  set active(i) {
    this.activeIndex = i;
  };
  @Output() selected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onTouch (e, i) {
    this._activeIndex = i;
    this.activeIndex = i;
    this._startY = e.touches[0].pageY;
    this.selected.emit(i);
  }

  onMove (e) {
    const HEIGHT = 18;  // 导航条中，单个字母的高度
    
    of(e)
    .pipe(
      pluck('touches', '0', 'pageY'),
      map(val => Math.trunc((val - this._startY) / HEIGHT) + this._activeIndex),
      takeWhile(val => val >= 0 && val < this.list.length),
    )
    .subscribe(val => {
      this.activeIndex = val;
      this.selected.emit(val);
    });
  }

}