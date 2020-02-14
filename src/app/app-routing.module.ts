import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login-component/login.component';
import { HomeComponent } from './components/home-component/home.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
