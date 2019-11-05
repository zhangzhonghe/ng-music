import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { CdCircleComponent } from './cd-circle/cd-circle.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlayerComponent, CdCircleComponent, ProgressBarComponent],
  exports: [
    PlayerComponent
  ]
})
export class AppPlayerModule { }