import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService ) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type" : "application/json",
    Authorization: 'Bearer '+this.authService.getToken()
  });

     //URL_API = "http://10.0.2.2:8000";//servidor para emulador
     //URL_API = "http://127.0.0.1:8000/api/"; // servidor directo
     URL_API = "http://192.168.1.38/MASTER-FULL-STACK/api-rest-laravel/public/api/";
   
    getUsers(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.URL_API + 'usuarios', {headers : headers}); 

  }

  getUser(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.URL_API + 'usuarios/detalle/'+id, {headers : headers}); 
  }
  


  update(token, usuario): Observable<any>{
    usuario.description = global.htmlEntities(usuario.description);
    let json =JSON.stringify(usuario);
    let parametros = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', ' application/x-www-form-urlencoded')
                                    .set('Authorization', token);
    
    return this.http.put(`${this.URL_API}usuarios/update`, parametros, {headers : headers});
  }

  deleteUsuario(id,token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', ' application/x-www-form-urlencoded')
                                    .set('Authorization', token);
    return this.http.delete(`${this.URL_API}usuarios/${id}`,{headers:headers});
  }

}

