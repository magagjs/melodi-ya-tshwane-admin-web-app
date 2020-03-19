import { Component, OnInit, Input } from '@angular/core';
import { EventsInfo } from '../../models/events-info';

@Component({
  selector: 'myt-preview-content',
  templateUrl: './preview-content.component.html',
  styleUrls: ['./preview-content.component.css']
})
export class PreviewContentComponent implements OnInit {
  // Accept Event model object as in Input in order to display in UI
  @Input() public eventInfo: EventsInfo;
  constructor() { }

  ngOnInit(): void {
    console.log("Event Info Input:");
    console.log(this.eventInfo);
  }

}
