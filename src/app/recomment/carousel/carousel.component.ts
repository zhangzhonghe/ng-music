import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { of, iif, Subscription } from 'rxjs';
import { pluck, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() list: string[];
  active: number = 0;
  move: number = 0;
  private _move: number = 0;
  startClientX: number;
  animation: boolean = true;
  private _auto: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.autoCarousel(window.innerWidth);
  }

  onStart (e) {
    this.animation = false;
    this._auto.unsubscribe();

    of(e)
    .pipe(pluck('touches', '0', 'clientX'))
    .subscribe(val => this.startClientX = val)
  }

  onMove (e) {
    of(e)
    .pipe(pluck('touches', '0', 'clientX'))
    .subscribe(val => {
      this.move = val - this.startClientX + this._move;
    })
  }

  onEnd (imgRef: HTMLImageElement, index: number) {
    this.animation = true;
    const move: number = Math.abs(this.move - this._move); // 跟随手指滑动的距离
    const right: boolean = this.move > this._move;   // 向右滑动

    iif(
      () => move >= imgRef.offsetWidth / 3,
      iif(
        () => right,
        iif(
          () => index === 0,
          of(-move),
          of(imgRef.offsetWidth - move).pipe(tap(val => this.active--))
        ),
        iif(
          () => index === this.list.length - 1,
          of(move),
          of(move - imgRef.offsetWidth).pipe(tap(val => this.active++))
        )
      ),
      iif(
        () => right,
        of(-move),
        of(move)
      )
    )
    .subscribe(val => {
      this.move += val;
      this.autoCarousel(imgRef.offsetWidth);
    });

    // 缓存当前总共移动的距离
    this._move = this.move;
  }

  // 启动自动轮播
  autoCarousel (width: number) {
    this._auto = iif(
      () => this.active >= this.list.length - 1,
      of(0),
      of(this.move - width)
    )
    .pipe(
      delay(3000),
      tap(val => {
        if (val) this.active++;
        else  this.active = 0;
      })
    )
    .subscribe(val => {
      this.move = val;
      this._move = this.move;
      this.autoCarousel(width);
    });
  }
}