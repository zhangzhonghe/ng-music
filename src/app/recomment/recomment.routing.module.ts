import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RecommentComponent } from './recomment.component';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  {
    path: 'recomment',
    component: RecommentComponent,
    children: [
      {
        path: ':dissid',
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
export class RecommentRoutingModule { }