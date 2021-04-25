import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins, StatusBarStyle} from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from './services/auth.service';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  componentesMenu: any=[];
  usuario;
  constructor(
    private platform: Platform,
    private dataService: DataService,
    private authService: AuthService,
    private pushService: PushService
  ) {
    this.initializeApp();
    this.usuario = this.authService.getIdentity();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try{
      await SplashScreen.hide();
      await StatusBar.setStyle({style: StatusBarStyle.Light});
      if(this.platform.is('android')){
        StatusBar.setBackgroundColor({color:'#CDCDCD'});
      }
    }catch(err){
      console.log('Esto es normal en un navegador', err);
    }  

    this.platform.ready().then(() => {
      this.dataService.getOptionsMenu().subscribe(res=>{
        this.componentesMenu = res;
      })
      this.pushService.configuracionInicial();
    });
  }
}
