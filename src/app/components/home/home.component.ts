import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/services/browser-storage.service';

@Component({
  selector: 'myt-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminName: string;  // admin full name for welcoming

  constructor(private browserStorageService: BrowserStorageService) { }

  ngOnInit(): void {
    // get admin name from session storage using injected service
    this.adminName = this.browserStorageService.getSessionUserKey();
  }

}
