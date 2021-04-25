import { Component, OnInit } from '@angular/core';
import { Recetas } from '../../interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  recetas: Recetas[] = [];
  user: any;
  userId: any;
  status: string;

  constructor(private authService: AuthService, private dataService: DataService) { 
    this.user = this.authService.getIdentity();
    this.userId = this.user.sub;
  }

  ngOnInit() {
    this.dataService.existeArchivo('registros.txt').then(res=>{
      console.log("El archivo existe . " , res);
    }).catch(error=>{
      console.log("El archivo no existe " ,error);
    });
  }

  getRecetas(){
    this.dataService.getRecetas(this.user).subscribe(res=>{
      if(res.status == 'success'){
        this.recetas = res.recetas;
      }else{
        this.status = 'error';
        console.log('No hay recetas');
      }
    },error=>{
      console.log(error);
    });
  }

}
