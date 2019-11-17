import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})

export class EmptyComponent implements OnInit {
  @Input() content = '没有任何东西';
  
  constructor() { }

  ngOnInit() { }
}