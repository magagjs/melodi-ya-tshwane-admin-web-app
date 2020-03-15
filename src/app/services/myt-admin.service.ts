import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginRequestInfo } from "../models/login-request-info";
import { LoginResponseInfo } from '../models/login-response-info';
import { environment } from "../../environments/environment";
import { AddEventRequestInfo, AddEventResponseInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MytAdminService {

  appApiBase = environment.mytApiBaseUrl;
  loginApiEndpoint = environment.mytLoginEndpoint;
  addEventsEndpoint = environment.mytAddEventsEndpoint;

  constructor(private http: HttpClient) {  }

  optionsJson = {
    headers: new HttpHeaders().append('Content-Type','application/json')
  }

  // leave blank for it to work:https://stackoverflow.com/questions/50572363/angular-6-post-request-with-a-multipart-form-doesnt-include-the-attached-file-o
  optionsFormData = {
    headers: new HttpHeaders().append('enctype','')
  }

  // function to post login to Web API and get JSON object response into observable
  processAdminLogin( loginInfo: LoginRequestInfo ): Observable<LoginResponseInfo>{
    return this.http.post<LoginResponseInfo>(this.appApiBase + this.loginApiEndpoint,loginInfo)
     // .pipe(catchError(this.handleHttpError));
  }

  // function to post add event data to Web APIs
  processMytAddEvent( addEventsinfo: AddEventRequestInfo ): Observable<AddEventResponseInfo>{
    return this.http.post<AddEventResponseInfo>(this.appApiBase + this.addEventsEndpoint,addEventsinfo)
  };

  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if(error.error instanceof ErrorEvent){
      // client-side
      errorMessage = "Error: " + error.error.message;
    }else{
      // server-side
      errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
    }
    
    return throwError(errorMessage);
  }

}
