import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { AppCommonModule } from '../common/app-common.module';

import { UserComponent } from './user.component';

@NgModule({
  imports: [UserRoutingModule, CommonModule, AppCommonModule],
  declarations: [UserComponent],
  providers: [],
})
export class UserModule { }
