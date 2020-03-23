import { Component, OnInit } from '@angular/core';

import { Events } from "../../../models/events";
import { ContentsHttpRequest } from "../../../models/contents-http-request";
import { MytAdminService } from "../../../services/myt-admin.service";

@Component({
  selector: 'myt-edit-event-form',
  templateUrl: './edit-event-form.component.html',
  styleUrls: ['./edit-event-form.component.css']
})
export class EditEventFormComponent implements OnInit {

  eventList:Array<Events>;
  // contentType for service and API call = 'events'
  contentRequest:ContentsHttpRequest= new ContentsHttpRequest("events");

  constructor( private adminService:MytAdminService ) {  }

  ngOnInit(): void {
    // list events on initialization-accept contentType argument to get all events
    this.adminService.processMytListContents(this.contentRequest).subscribe(
      (eventListObservale) => {
        this.eventList = {...eventListObservale};
        console.log("eventList:");
        console.log(this.eventList);
      },
      error=>{
        alert(error.message);
      }
    );
  }

}
