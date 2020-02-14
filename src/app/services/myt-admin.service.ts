import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginRequestInfo } from "../service-info/login-request-info";
import { LoginResponseInfo } from '../service-info/login-response-info';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MytAdminService {

  loginApiBase = environment.mytApiBaseUrl;
  loginApiEndpoint = environment.mytLoginEndpoint;

  //======================== CORS to allow Cross-Origin - REMOVE IN PROD? ================================================================

  // include headers in Angular as well as php to allow CORS
  headerJson = {
    'Access-Control-Allow-Origin': '*', // ============ PROD: Specify exact/relative domain to allow: DO NOT ALLOW * (ALL)!!! ============
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Max-Age': '600',
    'Content-Type': 'application/json'
  };
  headersConfig = new HttpHeaders(this.headerJson);
  options = {headers: this.headersConfig};

  //======================== CORS to allow Cross-Origin - REMOVE IN PROD? ================================================================

  constructor(private http: HttpClient) {  }

  // function to post login to Web API and get JSON object response into observable
  processAdminLogin( loginInfo: LoginRequestInfo ): Observable<LoginResponseInfo>{
    return this.http.post<LoginResponseInfo>(this.loginApiBase + this.loginApiEndpoint,loginInfo, this.options)
    //return this.http.post<LoginResponseInfo>(this.loginApiBase + this.loginApiEndpoint,loginInfo)
     // .pipe(catchError(this.handleHttpError));
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
