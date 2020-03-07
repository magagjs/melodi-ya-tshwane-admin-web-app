import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private browserStorageService: BrowserStorageService) { }

  // check login token to identify if user authenticated
  public isAuthenticated(): boolean{
    return this.browserStorageService.getSessionLoginKey();
  }

}
