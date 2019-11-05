import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { pluck, map, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() total: number;
  @Input()
  set progress (val) {
    if (this._touching) return;
    this.rateOfProgress = val;
  };
  private _touching: boolean = false;
  @Input() duration: number;
  progressBarLeft: number;
  progressBarWidth: number;
  rateOfProgress: number = 0;
  @ViewChild('progressWrapper', { static: false })
  set wrapperRef(el: ElementRef) {
    this.progressBarLeft = el.nativeElement.offsetLeft;
    this.progressBarWidth = el.nativeElement.offsetWidth;
  };
  @Output() changed: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTouch (e: TouchEvent) {
    this._touching = true;
    
    of(e)
    .pipe(
      pluck('targetTouches', '0', 'clientX'),
      map((val: number) => val - this.progressBarLeft),
      map((val: number) => val / this.progressBarWidth),
    )
    .subscribe((val: number) => {
      this.rateOfProgress = val;
      // this.changed.emit(val);
    })
  }

  onMove (e: TouchEvent) {
    of(e)
    .pipe(
      pluck('targetTouches', '0', 'clientX'),
      map((val: number) => val - this.progressBarLeft),
      takeWhile((val: number) => val >= 0 && val <= this.progressBarWidth),
      map((val: number) => val / this.progressBarWidth),
    )
    .subscribe((val: number) => {
      this.rateOfProgress = val;
      // this.changed.emit(val);
    })
  }

  onEnd () {
    this._touching = false;
    this.changed.emit(this.rateOfProgress);
  }

}