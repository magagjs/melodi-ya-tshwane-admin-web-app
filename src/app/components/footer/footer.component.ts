import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myt-admin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  todayDate: Date = new Date;
  todayYear: number;

  constructor() { }

  ngOnInit(): void {
    this.todayYear = this.todayDate.getUTCFullYear();
  }

}
