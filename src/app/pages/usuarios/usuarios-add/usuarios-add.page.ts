import { Component, OnInit } from '@angular/core';
import { UsuariosService  } from '../../../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { User } from'../../../interfaces/interfaces';

@Component({
  selector: 'app-usuarios-add',
  templateUrl: './usuarios-add.page.html',
  styleUrls: ['./usuarios-add.page.scss'],
})
export class UsuariosAddPage implements OnInit {
  usuario: User;
  constructor(private usuarioService: UsuariosService,private authService: AuthService, private toastController: ToastController) {
     
   }

  ngOnInit() {
  }

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),, Validators.min(5)]),
      password: new FormControl('',[Validators.required, Validators.min(5)]),
      surname: new FormControl('',[Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),, Validators.min(5)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl(''),
      image: new FormControl('')
     
    })
  }

  contactForm: FormGroup;

  saveUsuario(){

   this.authService.registerUser(this.contactForm.value).subscribe( res=>{
     if(res.status=='success'){
        this.presentToast('El Usuario ha sido registrado correctamente');
     }else{
      this.presentToast('Ha ocurrido un problema en el registro del usuario');
     }   
      },
      error=>{
        this.presentToast('Ha ocurrido un problema en el registro del usuario');
        console.log(JSON.stringify(error));
      }
      );
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

}
