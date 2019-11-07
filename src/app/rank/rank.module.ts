import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/app-common.module';
import { RankRoutingModule } from './rank.routing.module';

import { RankComponent } from './rank.component';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    RankRoutingModule
  ],
  declarations: [
    RankComponent,
    SongListComponent
  ]
})
export class RankModule { }