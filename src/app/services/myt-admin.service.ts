import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginRequest } from "../models/login-request";
import { LoginResponse } from "../models/login-response";
import { environment } from "../../environments/environment";
import { AddEventRequestInfo, AddEventResponseInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MytAdminService {

  appApiBase = environment.mytApiBaseUrl;
  loginApiEndpoint = environment.mytLoginEndpoint;
  addEventsEndpoint = environment.mytAddEventsEndpoint;
  listContentsEndpoint = environment.mytListContentsEndpoint;

  constructor(private http: HttpClient) {  }

  optionsJson = {
    headers: new HttpHeaders().append('Content-Type','application/json')
  }

  // leave blank for it to work:https://stackoverflow.com/questions/50572363/angular-6-post-request-with-a-multipart-form-doesnt-include-the-attached-file-o
  optionsFormData = {
    headers: new HttpHeaders().append('enctype','')
  }

  // function to post login to Web API and get JSON object response into observable
  processAdminLogin( loginInfo: LoginRequest ): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.appApiBase + this.loginApiEndpoint,loginInfo)
     // .pipe(catchError(this.handleHttpError));
  }

  // function to post add event data to Web APIs
  processMytAddEvent( addEventsinfo: AddEventRequestInfo ): Observable<AddEventResponseInfo>{
    return this.http.post<AddEventResponseInfo>(this.appApiBase + this.addEventsEndpoint,addEventsinfo)
  };

  // function to get a list of Items based on content type to be determine by parameter
  processMytListContents( contentType: string ): Observable<any> {
    return this.http.post<any>(this.appApiBase + this.listContentsEndpoint, contentType);
  }

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
