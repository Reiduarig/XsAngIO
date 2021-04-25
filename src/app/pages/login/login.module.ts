import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
//import { FormControl, FormGroup, Validators } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    NetworkInterface
    //Router,
    //FormControl, 
    //FormGroup, 
    //Validators
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
