import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _moment from 'moment';  // does not have default export so import * with 'as'

import { MytAdminService } from '../../services/myt-admin.service';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { AddEventRequestInfo, AddEventResponseInfo, FileResponseInfo } from '../../models';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { FileUploadService } from '../../services/file-upload.service';

// create the moment object as constant
const moment = _moment;

// create custom moment formats for parsing and displaying
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

// drop-down of event owner
interface EventOwners{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'myt-manage-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [ 
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class EventsComponent implements OnInit {
  addEventRequest: AddEventRequestInfo;   // request object for events API call
  addEventResponse: AddEventResponseInfo; // response object for events API consume
  fileUploadResponse: FileResponseInfo;   // response object for file API consume
  mytAddEventsForm: FormGroup;            // for form controls
  hasEventContent: boolean = false;       // toggle display of context input textarea
  hasEventImage: boolean = false;         // toggle display of image input file upload
  datePickerValue: any;                   // value from datePicker from form
  ownerSelectValue: string;               // value from owner drop-down
  fileUploadPath: string = "";            // path of file on server after upload
  //uploadedFile: File;

  // event owners array-modify this to add more ministries, etc
  ownersArray: EventOwners[] = [
    {value: 'General Event' , viewValue: 'General Event'}, 
    {value: 'Church Council', viewValue: 'Church Council'}, 
    {value: 'CWM', viewValue: 'CWM'}, 
    {value: 'CWL', viewValue: 'CWL'}, 
    {value: 'CMM', viewValue: 'CMM'}, 
    {value: 'CYM', viewValue: 'CYM'}, 
    {value: 'MyT Youth', viewValue: 'MyT Youth'},
    {value: 'MyT Choir', viewValue: 'MyT Choir'},
    {value: 'Sunday School', viewValue: 'Sunday School'},
    {value: 'Committees', viewValue: 'Committees'},
    {value: 'Wards', viewValue: 'Wards'}
  ];

  constructor( private formBuilder: FormBuilder, 
               private adminService: MytAdminService,
               private fileUploadService: FileUploadService,
               private browserStorageService: BrowserStorageService,
               private router: Router) { 

     // initialize events add form for validation on component call/initialization          
     this.initAddForm();
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize; // resize textarea automatically

  // initialize form-for validation of fields, invalid disables submit button 
  private initAddForm(){
    this.mytAddEventsForm = this.formBuilder.group({
      eventTitle: new FormControl(),
      eventOwner: new FormControl(),
      eventDate: new FormControl(moment().format("YYYY-MM-DD")),  // format for display on UI
      eventContent: new FormControl(),
      eventsFile: ['']    // form attribute to hold file data-https://www.techiediaries.com/php-file-upload-tutorial/
    });
  }

  ngOnInit(): void {
    this.addEventRequest = new AddEventRequestInfo();     // initialize for use in API request call
    this.addEventResponse = new AddEventResponseInfo();   // initialize for use in API response consume
  }

  eventContentSelectedHandler(event: MatCheckboxChange): void{
    if(event.checked){
      this.hasEventContent = true;
    }else{
      this.hasEventContent = false;  // necessary to hide the textarea again
    }
  }

  eventImageSelectedHandler(event: MatCheckboxChange): void{
    if(event.checked){
      this.hasEventImage = true;
    }else{
      this.hasEventImage = false;  // necessary to hide the file browser again
    }
  }

  getDateValue(event): void{
    this.datePickerValue = moment(event.value).format("YYYY-MM-DD");  // format for insert in backend DB
  }

  // set formData for input value as file selected-Enables the file to be value of input name attribute
  // https://www.techiediaries.com/php-file-upload-tutorial/
  eventFileSelect(event): void{
    if(event.target.files.length > 0){
      const file = event.target.files[0];                     // get a single file from file upload array
      const fileFormData = new FormData();
      //this.mytAddEventsForm.get('eventsFile').setValue(file); // set uploaded file to eventsFile attrib
      //this.mytAddEventsForm.get('eventsFile').value // form data to assign file for upload
      //this.uploadedFile = file;
      fileFormData.append('eventsFile', file);

      // call service to upload file to server
      this.fileUploadService.processUploadEventFile(fileFormData).subscribe( (fileUploadResponseObservable)=> {
        this.fileUploadResponse = {...fileUploadResponseObservable};  // assign returned observable to response object

        if(this.fileUploadResponse.filePath.length > 0) {
          this.fileUploadPath = this.fileUploadResponse.filePath;     // assign file directory from response object
        }

      });
    }
  }

  // onSubmit form-call api to add events
  addEvents(): void {
    // bind form values to request object 
    const formValues = this.mytAddEventsForm.value;
    this.addEventRequest.title = formValues.eventTitle;
    this.addEventRequest.owner = formValues.eventOwner;
    // only add form content on checking hasContent flag
    if(this.hasEventContent){
      this.addEventRequest.content = formValues.eventContent;
    }else{
      this.addEventRequest.content = "No Content was added with this Event!!";
    }
    this.addEventRequest.date = this.datePickerValue;
    // bind flags for content and image to request object
    this.addEventRequest.hasContent = this.hasEventContent;
    this.addEventRequest.hasImage = this.hasEventImage;
    // bind session storage admin name and token to request object 
    this.addEventRequest.adminUser = this.browserStorageService.getSessionUserKey();
    this.addEventRequest.adminToken = this.browserStorageService.getSessionLoginKey();
    // remove backslashes and ellipsis to extract the filename only and prevent ModSecurity errors
    this.addEventRequest.imagePath = this.fileUploadPath;

    // get formdata (name/value) of file upload form file input formControl
    //const eventsFormData = new FormData();
    //eventsFormData.append('addEventRequest', JSON.stringify(this.addEventRequest));
    //fileUploadFormData.append('eventsFile', this.uploadedFile); // get key/value form data
    //fileUploadFormData.append('addEventRequest', JSON.stringify(this.addEventRequest));

    console.log("Title: " + this.addEventRequest.title);
    console.log("Owner: " + this.addEventRequest.owner);
    console.log("Date: " + this.addEventRequest.date);
    console.log("Content: " + this.addEventRequest.content);
    console.log("HasContent: " + this.addEventRequest.hasContent);
    console.log("HasImage: " + this.addEventRequest.hasImage);
    console.log("AdminUser: " + this.addEventRequest.adminUser);
    console.log("AdminToken: " + this.addEventRequest.adminToken);
    console.log("FileUploadPath: " + this.fileUploadPath);
    
    // consume add events webservice by subscribing to returned Observable and process response
    this.adminService.processMytAddEvent(this.addEventRequest).subscribe( (addEventResponseObserable)=> {
        this.addEventResponse = {...addEventResponseObserable}; // assign returned observable to response object
        this.mytAddEventsForm.reset;                            // reset form input values for cleanup

        // forward to events page on successful event add and email send
        if( (this.addEventResponse.addEventStatus == "Success") && 
                (this.addEventResponse.addEventEmailSent == "Success") ) {

                  console.log("addEventStatus: " + this.addEventResponse.addEventStatus);
                  console.log("addEventEmailSent: " + this.addEventResponse.addEventEmailSent);

              this.router.navigateByUrl('/home');         // forward back to events page on success
        }
      },err=>{
        alert(err.message);
      } 
    );

  }

}
