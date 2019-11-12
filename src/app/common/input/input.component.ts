import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input()
  set value (newVal) {
    this.innerValue = newVal;
  };
  @Output() valueChange = new EventEmitter();
  private _value: string = '';
  
  constructor() { }

  set innerValue (newVal) {
    this._value = newVal;
    this.valueChange.emit(this._value);
  }

  get innerValue () {
    return this._value;
  }
  
  ngOnInit() { }

  onEmpty () {
    this._value = '';
    this.valueChange.emit('');
  }
}