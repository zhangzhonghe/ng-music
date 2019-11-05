import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommentRoutingModule } from './recomment.routing.module';

import { RecommentComponent } from './recomment.component'
import { CarouselComponent } from './carousel/carousel.component';
import { SongListItemComponent } from './song-list-item/song-list-item.component';
import { SongListDetailComponent } from '../common/song-list-detail/song-list-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RecommentRoutingModule
  ],
  declarations: [
    RecommentComponent,
    CarouselComponent,
    SongListItemComponent,
    SongListDetailComponent
  ]
})
export class AppRecommentModule { }