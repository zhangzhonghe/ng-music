import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SingerComponent } from './singer.component';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  {
    path: 'singer',
    component: SingerComponent,
    children: [
      {
        path: ':mid',
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
export class SingerRoutingModule { }