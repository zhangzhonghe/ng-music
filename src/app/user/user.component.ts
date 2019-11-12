import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  currentTab = 'like';
  
  constructor(
    private _location: Location
  ) { }

  ngOnInit() { }

  onSelectedLike () {
    this.currentTab = 'like';
  }

  onSelectedHistory () {
    this.currentTab = 'history';
  }

  onBack () {
    this._location.back();
  }
}