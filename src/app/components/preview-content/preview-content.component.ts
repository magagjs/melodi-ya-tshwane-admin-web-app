import { Component, OnInit, Input } from '@angular/core';
import { Events } from '../../models/events';

@Component({
  selector: 'myt-preview-content',
  templateUrl: './preview-content.component.html',
  styleUrls: ['./preview-content.component.css']
})
export class PreviewContentComponent implements OnInit {
  // Accept Event model object as in Input in order to display in UI
  @Input() public events: Events;
  constructor() { }

  ngOnInit(): void {
    console.log("Event Info Input:");
    console.log(this.events);
  }

}
