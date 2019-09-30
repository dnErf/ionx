import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FavoriteCardStore } from './card/shared/card-favorite.store';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot({
      name: 'hscl',
      driverOrder: ['localstorage', 'indexeddb']
    }), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FavoriteCardStore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// https://github.com/Jerga99/heartstoneLib-updated
// https://rapidapi.com/omgvamp/api/hearthstone?utm_source=mashape&utm_medium=301&account=EKLERA

// https://blog.angularindepth.com/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0
// https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
// https://codecraft.tv/courses/angular/http/http-with-observables/
// https://www.djamware.com/post/5be52ce280aca72b942e31bc/ionic-4-angular-7-and-cordova-tutorial-build-crud-mobile-apps

