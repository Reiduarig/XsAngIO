import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UsuariosAddPage } from './usuarios-add.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UsuariosAddPage
  }
];

@NgModule({
  providers:[FormControl, FormGroup, Validators],
  imports: [RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule],
})
export class UsuariosAddPageRoutingModule {}
