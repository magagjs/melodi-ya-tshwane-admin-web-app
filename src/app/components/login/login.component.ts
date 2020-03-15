import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MytAdminService } from "../../services/myt-admin.service";   // API for calling webAPI
import { LoginRequestInfo } from '../../models/login-request-info';
import { LoginResponseInfo } from '../../models/login-response-info';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'myt-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mytAdminLoginForm: FormGroup;     // for form controls
  loginRequest: LoginRequestInfo;   // holds request object for API call
  loginResponse: LoginResponseInfo; // holds response object for API consume
  username: string;                 // form inputs
  password: string;

  // inject the API service in our constructor to consume login API later
  constructor(private adminService: MytAdminService,
              private browserStorageService: BrowserStorageService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { 

    // initialize login form for validation on component call/initialization          
    this.initForm();
  }

  // initialize form-for validation of fields, invalid disables submit button 
  private initForm(){
    this.mytAdminLoginForm = this.formBuilder.group({
      username: new FormControl(),
      password: new FormControl()
      /*username: [Validators.compose(
        [
          Validators.required,        // cannot submit empty input
          Validators.maxLength(50)    // only 50 characters for input
        ]
      )],
      password: [Validators.compose(
        [
          Validators.required,        // cannot submit empty input
          Validators.maxLength(20)    // only 20 characters for input
        ]
      )]*/
    });
  }

  ngOnInit(): void { 
    this.loginRequest = new LoginRequestInfo();   // initialize for use as API request call
    this.loginResponse= new LoginResponseInfo();  // initialize for use as API response consume

    // check if user authenticated using authService and forward to home if authenticated
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl('/home');         // forward to home page without signing in
    }
  }
  
  // onSubmit form function that consumes login API
  adminLogin(): void {
    // get the form values and bind to request object
    const formValues = this.mytAdminLoginForm.value;
    this.loginRequest.username = formValues.username;
    this.loginRequest.password = formValues.password;

    // consume login webservice by subscribing to returned Observable and process response
    this.adminService.processAdminLogin(this.loginRequest).subscribe( (loginResponseObserable)=> {
          this.loginResponse = {...loginResponseObserable}; // assign returned observable to response object
          this.mytAdminLoginForm.reset;                     // reset form input values for cleanup

          // forward to admin home page on successful login
          if( this.loginResponse.loginStatus == "Success" &&
              this.loginResponse.loginUserFullName.length > 0 ) {
                // set login token in session storage key value-used to authenticate users across routes
                this.browserStorageService.setSessionLoginKey(this.loginResponse.loginToken);
                // set login user full name in session storage key-used to welcome users by name
                this.browserStorageService.setSessionUserKey(this.loginResponse.loginUserFullName);
                this.router.navigateByUrl('/home');         // forward to home page without signing in
              }
        } 
      );
  }

}
