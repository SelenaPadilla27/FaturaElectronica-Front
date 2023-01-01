import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import { PacientesComponent } from './components/pacientes/pacientes.component';

const routes: Routes = [
{
  path: 'login', component:LoginComponent
},
{
  path: 'paciente', component:PacientesComponent
},
{
  path: '', component:LoginComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
