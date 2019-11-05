import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { AppRecommentModule } from './recomment/app.recomment.module';
import { AppRankModule } from './rank/app.rank.module';
import { AppSearchModule } from './search/app.search.module';
import { AppSingerModule } from './singer/app.singer.module';
import { AppPlayerModule } from './player/app.player.module';
import { httpInterceptorProviders } from './http-interceptor/index';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { LoadingComponent } from './common/loading/loading.component';

import { ApiService } from './services/api.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRecommentModule,
    AppSearchModule,
    AppSingerModule,
    AppRankModule,
    AppPlayerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    LoadingComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    ApiService,
    httpInterceptorProviders
  ]
})
export class AppModule { }
