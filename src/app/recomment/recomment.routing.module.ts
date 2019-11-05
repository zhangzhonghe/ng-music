import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RecommentComponent } from './recomment.component';
import { SongListDetailComponent } from '../common/song-list-detail/song-list-detail.component';

const routes: Routes = [
  {
    path: 'recomment',
    component: RecommentComponent,
    children: [
      {
        path: ':dissid',
        component: SongListDetailComponent
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
export class RecommentRoutingModule { }