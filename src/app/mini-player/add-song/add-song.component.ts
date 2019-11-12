import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['/add-song.component.css']
})

export class AddSongComponent implements OnInit {
  @Output() close = new EventEmitter();
  currentTab = 'recent-play';
  
  constructor() { }

  ngOnInit() { }

  onSelectedRecentPlay () {
    this.currentTab = 'recent-play';
  }

  onSelectedSearchHistory () {
    this.currentTab = 'search-history';
  }

  onClose () {
    this.close.emit();
  }
}