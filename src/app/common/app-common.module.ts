import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading/loading.component';
import { SongListDetailComponent } from './song-list-detail/song-list-detail.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoadingComponent,
    SongListDetailComponent,
    InputComponent
  ],
  exports: [
    LoadingComponent,
    SongListDetailComponent,
    InputComponent
  ]
})
export class AppCommonModule { }
