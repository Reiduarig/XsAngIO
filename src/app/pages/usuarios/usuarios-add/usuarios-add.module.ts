import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosAddPageRoutingModule } from './usuarios-add-routing.module';

import { UsuariosAddPage } from './usuarios-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosAddPageRoutingModule
  ],
  declarations: [UsuariosAddPage]
})
export class UsuariosAddPageModule {}
