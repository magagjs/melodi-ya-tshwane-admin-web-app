import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { FileRequestInfo } from "../models/file-request-info";
import { FileResponseInfo } from "../models/file-response-info";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  appApiBase = environment.mytApiBaseUrl;
  eventFileUploadEndpoint = environment.mytEventFileUploadEndpoint;

  constructor(private http: HttpClient) { }

   // leave blank for it to work:https://stackoverflow.com/questions/50572363/angular-6-post-request-with-a-multipart-form-doesnt-include-the-attached-file-o
   optionsFormData = {
    headers: new HttpHeaders().append('enctype','')
  }

  processUploadEventFile(fileFormData: FormData): Observable<FileResponseInfo>{
    return this.http.post<FileResponseInfo>(this.appApiBase + this.eventFileUploadEndpoint,fileFormData)
  };

}
