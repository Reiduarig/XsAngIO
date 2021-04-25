import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IonList } from '@ionic/angular';
import { UsuarioDetalleComponent } from 'src/app/components/usuario-detalle/usuario-detalle.component';
import { InfoComponent } from 'src/app/components/info/info.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  @ViewChild('listaCerrar',{static: false}) listaCerrar: IonList;

  usuarios: any= [];
  identity: string;
  token: string;
  status: string;

  constructor(private userService: UsuariosService,private toastController: ToastController,
    private authService: AuthService,private router: Router, private mdlCtrl: ModalController,private route: ActivatedRoute) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
   }

  ngOnInit() {
    this.getUsers();
  }

  ionViewWillEnter(){
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res=>{
      if(res.status== 'success'){
        this.status='success';
        this.usuarios = res.users;
      }else{
        this.status='error';
      }
    },
    error=>{
      console.log(JSON.stringify(error))
    });

  }

  async mostrarDetalle(id: string){
    const modal = await this.mdlCtrl.create({
      component: UsuarioDetalleComponent,
      componentProps:{
        id
      }
    });
    await modal.present();
  }

  async mostrarInfo(id: string){
    const modal = await this.mdlCtrl.create({
      component: InfoComponent,
      componentProps:{
        id
      }
    });
    await modal.present();
    
  }

  onAddUsuario(){
    this.router.navigate(['/usuarios/usuarios-add'], {relativeTo: this.route});
  }


  onDelete(id){
    this.userService.deleteUsuario(id,this.token).subscribe(res=>{
      if(res.status == 'success'){
           this.presentToast('El usuario ha sido eliminado correctamente');
           this.router.navigate(['usuarios']);
      }else{
        this.status='error';
      }     
       },
       error=>{
         this.presentToast('Ha ocurrido un problema en la eliminación del usuario: ' + JSON.stringify(error));
         console.log(JSON.stringify(error));
       });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    await toast.present();
  }
}
