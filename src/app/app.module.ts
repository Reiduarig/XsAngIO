import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Magnetometer } from '@ionic-native/magnetometer/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Gyroscope } from '@ionic-native/gyroscope/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Magnetometer,
    DeviceMotion,
    DeviceOrientation,
    Gyroscope,
    OneSignal,
    File,
    EmailComposer
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
