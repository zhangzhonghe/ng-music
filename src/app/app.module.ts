import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ModalService } from './services/modal.service';
import { MessageService } from './services/message.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
    ModalService,
    MessageService,
    httpInterceptorProviders
  ]
})
export class AppModule { }
