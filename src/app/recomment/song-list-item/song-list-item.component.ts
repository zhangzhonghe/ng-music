import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrls: ['./song-list-item.component.css']
})
export class SongListItemComponent implements OnInit {
  @Input() info: object;

  constructor() { }

  ngOnInit() {
  }

}