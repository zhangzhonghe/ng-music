import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/app-common.module';
import { RecommentRoutingModule } from './recomment.routing.module';

import { RecommentComponent } from './recomment.component'
import { CarouselComponent } from './carousel/carousel.component';
import { SongListItemComponent } from './song-list-item/song-list-item.component';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    RecommentRoutingModule
  ],
  declarations: [
    RecommentComponent,
    CarouselComponent,
    SongListItemComponent,
    SongListComponent
  ]
})
export class RecommentModule { }