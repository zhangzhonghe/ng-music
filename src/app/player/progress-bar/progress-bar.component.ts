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
  rateOfProgress: number = 0;
  @ViewChild('progressWrapper', { static: false }) progressWrapper: ElementRef;
  @Output() changed: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTouch (e: TouchEvent) {
    this._touching = true;
    
    of(e)
    .pipe(
      pluck('targetTouches', '0', 'clientX'),
      map((val: number) => val - this.progressWrapper.nativeElement.offsetLeft),
      map((val: number) => val / this.progressWrapper.nativeElement.offsetWidth),
    )
    .subscribe((val: number) => {
      this.rateOfProgress = val;
    })
  }

  onMove (e: TouchEvent) {
    of(e)
    .pipe(
      pluck('targetTouches', '0', 'clientX'),
      map((val: number) => val - this.progressWrapper.nativeElement.offsetLeft),
      takeWhile((val: number) => val >= 0 && val <= this.progressWrapper.nativeElement.offsetWidth),
      map((val: number) => val / this.progressWrapper.nativeElement.offsetWidth),
    )
    .subscribe((val: number) => {
      this.rateOfProgress = val;
    })
  }

  onEnd () {
    this._touching = false;
    this.changed.emit(this.rateOfProgress);
  }

}