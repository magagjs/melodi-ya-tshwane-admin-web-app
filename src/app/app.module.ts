import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// custom dev components
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { ScripturesComponent } from './components/scriptures/scriptures.component';
import { BannersComponent } from './components/banners/banners.component';
import { EventsComponent } from './components/events/events.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PreviewContentComponent } from './components/preview-content/preview-content.component';
import { AddEventFormComponent } from './components/forms/add-event-form/add-event-form.component';
import { ProgressLoaderComponent } from './components/progress-loader/progress-loader.component';
import { ProgressLoaderService } from "./services/progress-loader.service"; // determine http call progress for UI
import { ProgressLoaderInterceptor } from "./interceptors/progress-loader-interceptor";  // intercept http calls to determine progress for UI

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    ScripturesComponent,
    BannersComponent,
    EventsComponent,
    AnnouncementsComponent,
    HeaderComponent,
    FooterComponent,
    PreviewContentComponent,
    AddEventFormComponent,
    ProgressLoaderComponent
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
    MatProgressSpinnerModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    ProgressLoaderService, // make available app-wide http call progress service 
    // make available app-wide custom http interceptor for http progress load
    {provide: HTTP_INTERCEPTORS, useClass: ProgressLoaderInterceptor, multi: true}                        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
