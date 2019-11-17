import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './loading/loading.component';
import { SongListDetailComponent } from './song-list-detail/song-list-detail.component';
import { InputComponent } from './input/input.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ModalComponent } from './modal/modal.component';
import { MessageComponent } from './message/message.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    LoadingComponent,
    SongListDetailComponent,
    InputComponent,
    SearchResultComponent,
    ModalComponent,
    MessageComponent,
    EmptyComponent
  ],
  exports: [
    LoadingComponent,
    SongListDetailComponent,
    InputComponent,
    SearchResultComponent,
    ModalComponent,
    MessageComponent,
    EmptyComponent
  ]
})
export class AppCommonModule { }
