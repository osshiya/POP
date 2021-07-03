import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { TimeAgoPipe } from './time-ago.pipe';
import { DiscoverPage } from './home/discover/discover.page';
import { HomePage } from './home/home.page';


@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    DiscoverPage,
    TimeAgoPipe
  ],
  entryComponents: [
    AppComponent,
    HomePage,
    DiscoverPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
