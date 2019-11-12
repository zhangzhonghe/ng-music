import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { RecommentModule } from './recomment/recomment.module';
import { RankModule } from './rank/rank.module';
import { SearchModule } from './search/search.module';
import { SingerModule } from './singer/singer.module';
import { PlayerModule } from './player/player.module';
import { AppCommonModule } from './common/app-common.module';
import { UserModule } from './user/user.module';
import { MiniPlayerModule } from './mini-player/mini-player.module';
import { httpInterceptorProviders } from './http-interceptor/index';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';

import { ApiService } from './services/api.service';
import { PlayerService } from './services/player.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RecommentModule,
    SearchModule,
    SingerModule,
    RankModule,
    PlayerModule,
    AppCommonModule,
    UserModule,
    MiniPlayerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    ApiService,
    PlayerService,
    UserService,
    httpInterceptorProviders
  ]
})
export class AppModule { }
