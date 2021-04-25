import { Component, OnInit, ApplicationRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PushService } from 'src/app/services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { global } from '../../services/global';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  mensajes: OSNotificationPayload[] = [];
  userId = '';
  user: any;
  url: any;

  //si funcionase sin el aplicationRef eliminamos el codigo a mayores que hemos puesto
  constructor(private menyCtrl: MenuController, public pushService: PushService,
    private applicationRef: ApplicationRef, private authService: AuthService) {
      this.user = this.authService.getIdentity();
      this.url = global.url; 
     }

  ngOnInit() {
    
    this.pushService.pushListener.subscribe( noti => {
      this.mensajes.unshift( noti );
      this.applicationRef.tick();
    });
  }

  toogleMenu(){
    this.menyCtrl.toggle();
  }

  async ionViewWillEnter(){
    console.log('Will Enter - Cargar mensajes');
    this.userId = await this.pushService.getUserIdOneSignal();

    this.mensajes = await this.pushService.getMensajes();
  }

  async borrarMensajes(){
    await this.pushService.borrarMensajes();
    this.mensajes = [];
    console.log(this.mensajes);
  }

  logout(){
    this.authService.logout();
  }





}
