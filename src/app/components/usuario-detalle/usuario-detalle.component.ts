import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { global } from "../../services/global";

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss'],
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() id;
 
  url;
  user: User;

  constructor(private userService: UsuariosService,private mdlCtrl: ModalController) {
    this.url = global.url;
   }

  ngOnInit() {
    this.getDetalle();
  }

  getDetalle(){
    this.userService.getUser(this.id).subscribe(res =>{
      if(res.status == 'success'){
        this.user = res.user;
      }
    },error=>{
      console.log(error);
    })
  }

  cerrar(){
    this.mdlCtrl.dismiss();
  }

}
