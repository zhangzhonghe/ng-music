import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cd-circle',
  templateUrl: './cd-circle.component.html',
  styleUrls: ['./cd-circle.component.css']
})
export class CdCircleComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() playing: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}