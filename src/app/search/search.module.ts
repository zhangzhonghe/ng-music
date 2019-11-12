import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search.routing.module';
import { AppCommonModule } from '../common/app-common.module';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule { }