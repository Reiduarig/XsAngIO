import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { InfoComponent } from './info/info.component';



@NgModule({
  entryComponents:[
    UsuarioDetalleComponent,InfoComponent
  ],
  declarations: [HeaderComponent,ErrorComponent,UsuarioDetalleComponent,InfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    ErrorComponent,
    UsuarioDetalleComponent,
    InfoComponent
  ]
})
export class ComponentsModule { }
