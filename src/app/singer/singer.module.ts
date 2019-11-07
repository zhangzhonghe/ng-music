import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/app-common.module';
import { SingerRoutingModule } from './singer.routing.module';

import { SingerComponent } from './singer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SingerRoutingModule
  ],
  declarations: [
    SingerComponent,
    NavBarComponent,
    SongListComponent
  ]
})
export class SingerModule { }