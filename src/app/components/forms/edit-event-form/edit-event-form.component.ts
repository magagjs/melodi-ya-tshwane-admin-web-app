import { Component, OnInit } from '@angular/core';

import { EventList } from "../../../models/event-list";
import { MytAdminService } from "../../../services/myt-admin.service";

@Component({
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html',
  styleUrls: ['./edit-event-form.component.css']
})
export class EditEventFormComponent implements OnInit {

  eventList:Array<EventList>;
  contentType:string = "events";  // contentType for service and API call

  constructor( private adminService:MytAdminService ) {  }

  ngOnInit(): void {
    // list EventList on initialization
    this.adminService.processMytListContents(this.contentType).subscribe(
      (listEventListObservale) => {
        this.eventList = {...listEventListObservale};
        console.log("eventList:");
        console.log(this.eventList);
      }
    );
  }

}
