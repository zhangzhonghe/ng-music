import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingerRoutingModule } from './singer.routing.module';

import { SingerComponent } from './singer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    SingerRoutingModule
  ],
  declarations: [
    SingerComponent,
    NavBarComponent
  ]
})
export class AppSingerModule { }