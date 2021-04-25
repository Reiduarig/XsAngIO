import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasPage } from './recetas.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: RecetasPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule],
  exports: [RouterModule],
})
export class RecetasPageRoutingModule {}
