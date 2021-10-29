import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../material/material.module';

import { RootComponent } from './components/root/root.component';
import { SplashComponent } from './components/splash/splash.component';
import { HomeComponent } from './components/home/home.component';
import { TranslatePipe } from './pipes/translation.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HammerModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    IonicModule.forRoot({ animated: false }),
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HammerModule
  ],
  declarations: [
    RootComponent,
    AppComponent,
    SplashComponent,
    HomeComponent,

    TranslatePipe
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [
    RootComponent
  ]
})
export class AppModule { }
