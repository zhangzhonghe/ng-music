import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading/loading.component';
import { SongListDetailComponent } from './song-list-detail/song-list-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    SongListDetailComponent
  ],
  exports: [
    LoadingComponent,
    SongListDetailComponent
  ]
})
export class AppCommonModule { }
