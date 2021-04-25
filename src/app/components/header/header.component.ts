import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { global } from "../../services/global";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  titulo: string;
  identity: any;
  url;
  constructor(private authService: AuthService) {
    this.titulo = '';
    this.identity = this.authService.getIdentity();
    this.url = global.url;
   }
 
  ngOnInit() {
    
  }

  logout(){
    this.authService.logout();
  }

}
