import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

/*const routes: Routes=[

  { path: '', component: LoginPage }

]*/

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path:'',
        pathMatch: 'full',
        component:LoginPage
      }
  ])
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
