import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'usuarios',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'informes',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/informes/informes.module').then( m => m.InformesPageModule)
  },
  {
    path: 'sensores',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/sensores/sensores.module').then( m => m.SensoresPageModule)
  },
  {
    path: 'recetas',
    loadChildren: () => import('./pages/recetas/recetas.module').then( m => m.RecetasPageModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./pages/citas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
