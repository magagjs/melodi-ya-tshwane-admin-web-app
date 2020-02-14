import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MytAdminService } from "../../services/myt-admin.service";   // API for calling webAPI
import { LoginRequestInfo } from 'src/app/service-info/login-request-info';
import { LoginResponseInfo } from 'src/app/service-info/login-response-info';
import { Router } from '@angular/router';

@Component({
  selector: 'myt-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mytAdminLoginForm: FormGroup;     // for form controls
  loginRequest: LoginRequestInfo;   // holds request object for API call
  loginResponse: LoginResponseInfo; // holds response object for API consume

  username: string;
  password: string;
  isAdmin: boolean;

  // inject the API service in our constructor to consume login API later
  constructor(private adminService: MytAdminService,
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
  }
  
  // onSubmit form function that consumes login API
  adminLogin(){
    // get the form values and bind to request object
    //const formValues = this.mytAdminLoginForm.value;
    this.loginRequest.username = this.mytAdminLoginForm.value.username;
    this.loginRequest.password = this.mytAdminLoginForm.value.password;

    console.log("Making WS Call...");
    console.log(""+this.loginRequest.username);
    console.log(""+this.loginRequest.password);

    // consume login webservice by subscribing to returned Observable and process response
    this.adminService.processAdminLogin(this.loginRequest)
      .subscribe( (loginResponseObserable)=> {
          // assign returned observable to response object
          this.loginResponse = {...loginResponseObserable};
          this.mytAdminLoginForm.reset;  // reset form values for cleanup

          // forward to admin home page on successful login
          if(this.loginResponse.loginStatus == "success".toLowerCase() &&
              this.loginResponse.loginUserFullName.length > 0 &&
              this.loginResponse.loginErrorMsg.length == 0){
                this.router.navigateByUrl('admin');
              }
        } 
      )
  }

}
