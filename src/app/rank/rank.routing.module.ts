import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RankComponent } from './rank.component';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  {
    path: 'rank',
    component: RankComponent,
    children: [
      {
        path: ':topid',
        component: SongListComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RankRoutingModule { }