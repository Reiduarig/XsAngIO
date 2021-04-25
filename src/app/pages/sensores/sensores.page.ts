import { Component, OnInit } from '@angular/core';
import { Magnetometer, MagnetometerReading } from '@ionic-native/magnetometer/ngx';
import { Gyroscope,GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
// DeviceOrientationCompassHeading is an interface for compass
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DBMeter } from '@ionic-native/db-meter/ngx';

declare var navigator;

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
})
export class SensoresPage implements OnInit {

  token: string;
  identity: string;
  status: string;
  
  fecha: string;
  idUsuario;
 
  watchGyro: any;
  subscription: any;
  subscriptionAcc: any;
  subscriptionOri: any;
  subscriptionDB: any;
  //giro
  xOrient:number;
  yOrient:number;
  zOrient:number;
  //aceleracióm
  timestamp:any
  accX:any;
  accY:any;
  accZ:any;
  //Magnetometro
  magX: any;
  magY: any;
  magZ: any;
  magCalculated: any;
  //
  aheading: any;  //en relacion al norte geografico
  bheading: any;  //orientación en relación al polo norte geográfico
  cheading: any;  //la desviación en grados entre lo reportado y lo mostrado
  
  //quaterniones
  quW: any;
  quX: any;
  quY: any;
  quZ: any;
  //opciones de los sensores
  Goptions: GyroscopeOptions = {
    frequency: 5000
 }

 degtorad: any;

 datos;
 Arraydatos: Array<any> =[];
 listaw: Array<any> = [];
 listax: Array<any> = []; 
 listay: Array<any> = []; 
 listaz: Array<any> = [];
 listaFecha: Array<any> = [];
 listaQuaternion: Array<any> = [];

//decibelios
listaDB: Array<any> = [];
 dB: any;

  constructor( private authService: AuthService,private magnetometer: Magnetometer,private gyroscope: Gyroscope,
              private deviceMotion: DeviceMotion,private deviceOrientation: DeviceOrientation,
              private dataService: DataService, private dbMeter: DBMeter) { 

    this.token = this.authService.getToken();
    this.identity = this.authService.getIdentity();
    this.idUsuario = this.identity.sub;
    
    this.xOrient = 0;
    this.yOrient = 0;
    this.zOrient= 0;
    //aceleracióm
    
    this.accX = 0;
    this.accY = 0;
    this.accZ = 0;    
    
    this.magX = 0;
    this.magY = 0;
    this.magZ = 0;
    this.magCalculated = 0;
    
    this.aheading = 0;
    this.bheading = 0;
    this.cheading = 0;

    this.quX = 0;
    this.quY = 0;
    this.quZ=0;
    
    
    this.degtorad = Math.PI / 180;

    this.Arraydatos = [];
    this.listaw = [];
    this.listax = [];
    this.listay = [];
    this.listaz = [];
    this.listaFecha = [];
    this.listaQuaternion = [];

    this.listaDB = []
    this.dB = 0;
  }

  ngOnInit() {}

  start(){
    this.watchMagnetometer();
  }
 
  watchGyroscopio(){
    this.watchGyro = this.gyroscope.watch(this.Goptions)
       .subscribe((orientation: GyroscopeOrientation) => {
          //console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
           this.xOrient = orientation.x;
           this.yOrient = orientation.y;
           this.zOrient= orientation.z;

          //si existe el usuario
          if(this.idUsuario !==null ){  
                //obtenemos la fecha actual
              this.fecha = this.hoyFecha();
             
             /* this.datos =
                          {
                            'fecha' : this.fecha,
                            'user_id': this.idUsuario,
                            'alpha' : this.accX, 
                            'beta' : this.accY,
                            'gamma' : this.accZ,
                            'orientation': this.aheading,
                            'orientationNorth': this.bheading,
                            'desviacion': this.cheading,
                            'gyrox' : this.xOrient,
                            'gyroy' : this.yOrient,
                            'gyroz' : this.zOrient,
                            'magX' : this.magX,
                            'magY' : this.magY,
                            'magZ' : this.magZ,
                            'magCalculated' : this.magCalculated
                          };*/
                
          }else{
            console.log("No existe el usuario");
          }
       },
       error=>{
         console.log(error);
       });
     }
 
  guardarArray(datos){
    this.Arraydatos.push(datos);
    
  }
  //guardar datos en la BBDD
  enviarDatos(datos,token){
    
    this.dataService.addData(datos,token).subscribe(res=>{
      if(res.status = 'success'){
        this.status = 'success';
        console.log('Registro guardado');
      }else{
        this.status = 'error';
        console.log('Error en el registro');
      }
    },error =>{
      console.log(error);
    })
  }

  enviarCorreo(){
   this.dataService.enviarCorreo(this.Arraydatos);
  }

  addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
  }

  hoyFecha(){
    var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        var hora = hoy.getHours();
        var min = hoy.getMinutes();
        var sg = hoy.getSeconds();
        
        dd = this.addZero(dd);
        mm = this.addZero(mm);
        hora= this.addZero(hora);
        min = this.addZero(min);
        sg = this.addZero(sg);

        return yyyy+'-'+mm+'-'+dd+' '+hora+':'+min+':'+sg;
  } 

 
// Watch device acceleration
watchAceleracion(){
  this.subscriptionAcc = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
    //console.log(acceleration);
    this.accX = acceleration.x;
    this.accY = acceleration.y;
    this.accZ = acceleration.z;
 });
}

// Stop watch
stopAceleracion(){
  this.subscriptionAcc.unsubscribe();  
}
//gyroscopio
 stopGyroscopio(){
  this.watchGyro.unsubscribe();
}
// Watch the device compass heading change
watchMagnetometer(){
  this.subscription = this.magnetometer.watchReadings().subscribe(
    (data: MagnetometerReading) => {
      this.magX = data.x;
      this.magY = data.y;
      this.magZ = data.z;
      this.magCalculated = data.magnitude.toFixed(4);
      // this.listaFecha.push(this.fecha);
      this.startListen();
     
      this.getQuaternion(this.magX,this.magY,this.magZ);

      this.listaw.push(this.quW);
      this.listax.push(this.quX);
      this.listay.push(this.quY);
      this.listaz.push(this.quZ);
      this.listaDB.push(this.dB);
      
    }
  );
}

// Stop watching heading change
stopMagnetometer(){
  this.subscription.unsubscribe();
  this.detenerEscucha();
  this.Arraydatos.push(this.listaw);
  this.Arraydatos.push(this.listax);
  this.Arraydatos.push(this.listay);
  this.Arraydatos.push(this.listaz);
  this.Arraydatos.push(this.listaDB);
  console.log(this.Arraydatos);
  this.enviarCorreo();
}

// Watch the device compass heading change
watchOrientacion(){
this.subscriptionOri = this.deviceOrientation.watchHeading().subscribe(
  (data: DeviceOrientationCompassHeading) => {
  this.aheading = data.magneticHeading.toFixed(5);//console.log(data)
  this.bheading = data.trueHeading.toFixed(5);
  this.cheading = data.headingAccuracy;
  });
}
// Stop watching heading change
stopOrientacion(){
  this.subscriptionOri.unsubscribe();
}

//determinar el rumbo de la brújula al que se enfrenta el usuario cuando sostiene el dispositivo con la pantalla aproximadamente vertical frente a ellos.
compassHeading( alpha, beta, gamma ) {

  var _x = beta  ? beta  * this.degtorad : 0; // beta value
  var _y = gamma ? gamma * this.degtorad : 0; // gamma value
  var _z = alpha ? alpha * this.degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  // Calculate Vx and Vy components
  var Vx = - cZ * sY - sZ * sX * cY;
  var Vy = - sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan( Vx / Vy );

  // Convert compass heading to use whole unit circle
  if( Vy < 0 ) {
    compassHeading += Math.PI;
  } else if( Vx < 0 ) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)

}
//representa la unidad de cuaternión del dispositivo en el marco de tierra XYZ, entonces dado que el marco del cuerpo inicial está alineado con la tierra, q es como sigue.
getQuaternion( alpha, beta, gamma ) {

  var _x = beta  ? beta  * this.degtorad : 0; // beta value
  var _y = gamma ? gamma * this.degtorad : 0; // gamma value
  var _z = alpha ? alpha * this.degtorad : 0; // alpha value

  var cX = Math.cos( _x/2 );
  var cY = Math.cos( _y/2 );
  var cZ = Math.cos( _z/2 );
  var sX = Math.sin( _x/2 );
  var sY = Math.sin( _y/2 );
  var sZ = Math.sin( _z/2 );

  //
  // ZXY quaternion construction.
  //

  var w = cX * cY * cZ - sX * sY * sZ;
  var x = sX * cY * cZ - cX * sY * sZ;
  var y = cX * sY * cZ + sX * cY * sZ;
  var z = cX * cY * sZ + sX * sY * cZ;

  this.quW = w;
  this.quX = x;
  this.quY= y;
  this.quZ= z;
  //return [ w, x, y, z ];

}

startListen(){
  this.subscriptionDB = this.dbMeter.start().subscribe(data =>{
     console.log(data);
     this.dB = data;
  },error=>{
    console.log(error);
  });;
}
comprobarEscucha(){
  // Check if we are listening
  this.dbMeter.isListening().then(
    isListening => console.log(isListening)
  );
}

// Stop listening
detenerEscucha(){
this.subscriptionDB.unsubscribe();
}  

// Delete DBMeter instance from memory
borrarEscucha(){
this.dbMeter.delete().then(
  () => console.log('Deleted DB Meter instance'),
  error => console.log('Error occurred while deleting DB Meter instance')
);
}
/*
getRotationMatrix( alpha, beta, gamma ) {

  var _x = beta  ? beta  * this.degtorad : 0; // beta value
  var _y = gamma ? gamma * this.degtorad : 0; // gamma value
  var _z = alpha ? alpha * this.degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  //
  // ZXY rotation matrix construction.
  //

  var m11 = cZ * cY - sZ * sX * sY;
  var m12 = - cX * sZ;
  var m13 = cY * sZ * sX + cZ * sY;

  var m21 = cY * sZ + cZ * sX * sY;
  var m22 = cZ * cX;
  var m23 = sZ * sY - cZ * cY * sX;

  var m31 = - cX * sY;
  var m32 = sX;
  var m33 = cX * cY;

  return [
    m11,    m12,    m13,
    m21,    m22,    m23,
    m31,    m32,    m33
  ];

};
*/
}