import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  identity: string;
  token: string;
  fecha1: Date;
  fecha2: Date;

  constructor(private http: HttpClient,private router: Router, private authService: AuthService,
    private file: File, private emailComposer: EmailComposer) {
     }

    headers = new HttpHeaders().set('Content-Type', ' application/x-www-form-urlencoded');

     //URL_API = "http://10.0.2.2:8000";//servidor para emulador
     //URL_API = "http://127.0.0.1:8000/api/"; // servidor directo
     URL_API = "http://192.168.1.38/MASTER-FULL-STACK/api-rest-laravel/public/api/";

     
     
     // ----------------------------   Secciones del navbar -----------------------------//

    getOptionsMenu(){
      return this.http.get(`/assets/datamenu/menu.json`);
    }

      
     // ------------------------    Sensores   --------------------------------//
     getDataAll(): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.URL_API + 'infostad', {headers : headers});
    }
  
    getDataByUser(id): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.URL_API + 'infostad/usuario/'+id, {headers : headers});                            
    }
  
    getDataByFecha(usuario,fecha1,fecha2): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.URL_API + 'infostad/datosByFecha/'+usuario+'/'+fecha1+'/'+fecha2,{headers : headers});
    }
  
    
    getData(id): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.URL_API + 'infostad/detalle/'+id, {headers : headers}); 
    }

    addData(usuario,token): Observable<any>{
      let json = JSON.stringify(usuario);
      let parametros = 'json='+json;
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('Authorization', token);
      return this.http.post(this.URL_API + 'infostad',parametros, {headers : headers}); 
    }

    deleteData(id,token): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('Authorization', token);
      return this.http.delete(this.URL_API + 'infostad/'+id, {headers : headers}); 
                                
    }

  
  //  ----------------------------- Enviar correo con los datos obtenidos de los sensores ----------//

  enviarCorreo(arrayDatos){
    const arrayTemp = []
    const cabecera = "import bpy\n\n";
    
    arrayTemp.push(cabecera)
    for(let i = 0; i < arrayDatos.length ; i++){
      arrayTemp.push("lista"+[i]+"=["+ arrayDatos[i] +"]\n");
    }
    arrayTemp.push("\n");
    
    /*const bucle =  `for v1,v2,v3 in zip(lista0,lista1,lista2):\n
    bpy.context.object.rotation_euler[0] = v1 
    bpy.context.object.rotation_euler[1] = v2
    bpy.context.object.rotation_euler[2] = v3\n\n`;*/
    const bucle = 'bpy.context.object.rotation_euler[0] = v1';
    arrayTemp.push(bucle);
    
    console.log(arrayTemp);

    /*for(let j = 0; j < arrayTemp.length ; j++){
    console.log(arrayTemp[j]);
    }*/
    console.log(arrayTemp.join('') );
    this.crearArchivo(arrayTemp.join(''));
  }

  crearArchivo(text: string){
    //verificar si el archivo existe
    this.file.checkFile(this.file.dataDirectory,'registros.txt')
              .then(existe=>{
                console.log("Existe archivo");
                //escribimos en el
                return this.escribirArchivo(text);
              })
              .catch(error=>{
                //si no existe se crea y se llama a la funcion de escribir
                console.log("el archivo no existe");
                return this.file.createFile(this.file.dataDirectory,'registros.txt',false).then(creado=>{
                  this.escribirArchivo(text);
                }).catch(error=>{
                  console.log("No se pudo crear el archivo");
                });
              });
  }

  async existeArchivo(string){
    this.file.checkFile(this.file.dataDirectory,string)
              .then(existe=>{
                console.log("Existe archivo");
                })
              .catch(error=>{
                //si no existe se crea y se llama a la funcion de escribir
                console.log("el archivo no existe");
              })  
  }

  async escribirArchivo(text: string){
    await this.file.writeExistingFile(this.file.dataDirectory,'registros.txt', text);
      console.log(this.file.dataDirectory + "registros.txt");
 
    const archivo = `${this.file.dataDirectory}/registros.txt`;
    
    
    const email = {
     to: 'giraudier82@gmail.com',
     //cc: '',
     //bcc: ['john@doe.com', 'jane@doe.com'],
     attachments: [
       archivo
     ],
     subject: 'Backup de sensores',
     body: 'Aquí están los backups de los sensores',
     isHtml: false
   }
   
   // Send a text message using default options
   this.emailComposer.open(email);
   
   }

   //  ---------------------------   datos de las recetas  ----------------------------//

   getRecetas(user: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.URL_API + 'recetas/'+user, {headers : headers});
   }


   // -----------------------------  datos de las citas ---------------------------------//

   getCitas(id:any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.URL_API + 'citas/user/'+id, {headers : headers});  
   }
}
