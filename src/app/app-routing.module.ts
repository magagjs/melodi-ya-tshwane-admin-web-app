import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminsContentComponent } from './components/admins-content/admins-content.component';
import { AdminsWebComponent } from './components/admins-web/admins-web.component';
import { EventsComponent } from './components/events/events.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { ScripturesComponent } from './components/scriptures/scriptures.component';
import { BannersComponent } from './components/banners/banners.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: '', component: LoginComponent, runGuardsAndResolvers: 'always'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path: 'admins-web', component: AdminsWebComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path: 'admins-content', component: AdminsContentComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path: 'events', component: EventsComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path: 'scriptures', component: ScripturesComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path: 'banners', component: BannersComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always'},
  {path:  '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
