import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myt-admin-alerts',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
