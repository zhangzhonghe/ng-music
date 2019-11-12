import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/app-common.module';

import { MiniPlayerComponent } from './mini-player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AddSongComponent } from './add-song/add-song.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule
  ],
  exports: [
    MiniPlayerComponent
  ],
  declarations: [
    MiniPlayerComponent,
    PlaylistComponent,
    AddSongComponent
  ],
  providers: [],
})
export class MiniPlayerModule { }
