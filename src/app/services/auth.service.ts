import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  identity: string;

  constructor(private http: HttpClient, private router: Router) { }

  headers = new HttpHeaders().set('Content-Type', ' application/x-www-form-urlencoded');

    //--disableHostCheck
  
   //URL_API = "http://10.0.2.2:8000";//servidor para emulador
   // URL_API = "http://127.0.0.1:8000/api/"; // servidor directo
   URL_API = "http://192.168.1.38/MASTER-FULL-STACK/api-rest-laravel/public/api/"; //servidor para dispositivo externo

  registerUser(usuario): Observable<any>{
    let json = JSON.stringify(usuario);
    let parametros = 'json='+json;
    return this.http.post<any>(`${this.URL_API}register`,parametros,{headers:this.headers});
         
  }       

  loginUser(usuario, gettoken=null): Observable<any>{
    
    
    if(gettoken != null){
      usuario.gettoken = true;
    }
    let json = JSON.stringify(usuario);
   
    let parametros = 'json='+json;
    
    return this.http.post(`${this.URL_API}login`, parametros, {headers : this.headers});    
         
  }  

  getToken(){
    let token = localStorage.getItem('token');

    if(token && token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity && identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  logout(): void{
    
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    
    this.router.navigate(['/login']);
  }
}