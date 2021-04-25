import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  entryComponents:[
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    ComponentsModule,
    
  ],
  providers:[
    
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}
