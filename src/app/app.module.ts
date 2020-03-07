import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// angular Material components
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
// the hassles of importing MATMOMENT and Moment.js are below: install moment.js and material-moment-adapter
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from "@angular/material/datepicker"; // used with moment.js!
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

// custom dev components
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { AdminsWebComponent } from './components/admins-web/admins-web.component';
import { AdminsContentComponent } from './components/admins-content/admins-content.component';
import { ScripturesComponent } from './components/scriptures/scriptures.component';
import { BannersComponent } from './components/banners/banners.component';
import { EventsComponent } from './components/events/events.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    AdminsWebComponent,
    AdminsContentComponent,
    ScripturesComponent,
    BannersComponent,
    EventsComponent,
    AnnouncementsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MomentDateModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
