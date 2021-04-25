import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Citas } from '../../interfaces/interfaces';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  
  citas: Citas[]=[];
  user: any;
  userId: any;
  status: string;

  constructor(private authService: AuthService, private dataService: DataService) {
    this.user = this.authService.getIdentity();
    this.userId = this.user.sub;
   }

  ngOnInit() {
   this.getCitas();
  }

  getCitas(){
    this.dataService.getCitas(this.userId).subscribe(res=>{
      if(res.status == 'success'){
        this.citas = res.citas;
      }else{
        this.status = 'error';
        console.log('No hay citas');
      }
    },error=>{
      console.log(error);
    });
  }

}
