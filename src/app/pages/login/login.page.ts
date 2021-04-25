import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  contactForm: FormGroup;
  status: string;
  token: any;
  identity: any;
  ip: any;
  red: any;
  ipOp: any;
  ipOpNet: any;

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute, 
    private toastController: ToastController, private networkInterface: NetworkInterface) {
    
      this.contactForm = this.createFormGroup();
    
  }
  createFormGroup(){
    return new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    })
  }

  ngOnInit() {
    this.contactForm.valid;
    //se ejecuta siempre y cierra sesión solo cuando le llega el parametro sure por la url
    this.logout();
  }

  onLogin(): void{   
    this.presentToast('Autenticando...');
    this.getWifi();
    this.getIp();            
    this.authService.loginUser(this.contactForm.value).subscribe(res=>{
        if(res.status != 'error'){
          this.token = res;
          this.authService.loginUser(this.contactForm.value, true).subscribe(
            response=>{
              this.identity = response;
              //persistencia de los datos del usuario identificado
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              
             
              
              localStorage.setItem('ip', this.ip);
              localStorage.setItem('ipnet', this.red);
              localStorage.setItem('ipOp', this.ipOp);
              localStorage.setItem('ipOpNet', this.ipOpNet);
             
              //redirigir al home
              this.router.navigate(['/inicio']);
          
            },
            error=>{
              this.status = 'error';
              console.log(<any>error);
            }
          );  
      
        }else{
          this.status = 'error';
        }
  },
  error=>{
  this.status = 'error';
  console.log(<any>error);
  });
}

logout(){
  this.route.params.subscribe(params=>{
    let logout = +params['sure']; //se convierte en entero el string con el +, se castea
  
    if(logout == 1){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');

      localStorage.removeItem('ip');
      localStorage.removeItem('ipnet');
      localStorage.removeItem('ipOp');
      localStorage.removeItem('ipOpNet');

      this.identity = null;
      this.token = null;
      this.router.navigate(['/login']);
    }
  
  });
}

 async presentToast(message: string) {
  const toast = await this.toastController.create({
    message,
    duration: 3000
  });
  await toast.present();
}

async getWifi(){
  await this.networkInterface.getWiFiIPAddress()
    .then(address => {
      this.ip = address.ip;
      this.red = address.subnet;
    })
    .catch(error => console.log(`Unable to get address wifi: ${error}`));
  }
  async getIp(){
   await this.networkInterface.getCarrierIPAddress()
    .then(address => {
      this.ipOp = address.ip;
      this.ipOpNet = address.subnet;
    })
    .catch(error => console.log(`Unable to get IP operator : ${error}`));
  }
  getProxi(url){
  //const url = 'www.github.com';
  this.networkInterface.getHttpProxyInformation(url)
    .then(proxy => console.info(`Type: ${proxy.type}, Host: ${proxy.host}, Port: ${proxy.port}`))
    .catch(error => console.error(`Unable to get proxy info: ${error}`));
  }

}
