import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { FormControl,FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { SignupPayload } from './signup.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  user: User = new User();
  signupform: FormGroup;
  signuppayload:SignupPayload;
  
  constructor(private formBuilder : FormBuilder , private router:Router, private userService: UserService) { 
    this.signuppayload={
      username:'',
      email:'',
      mobileNumber:'',
      password:'',
      confirmPassword:''
    } 
  }

  loginpage(){
    console.log("Button Click");
    this.router.navigate(["/login"]);
  }
  homepage(){
    console.log("Button Click");
    this.router.navigate(["/homepage"]);
  }
  ngOnInit(): void {
    this.signupform = new FormGroup({
      username : new FormControl('', [Validators.required,Validators.minLength(6)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      mobileNumber : new FormControl('',
        [
          Validators.required,
          // Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (](\\d{3})[-. )](\\d{3})[-. ](\\d{4})(?: *x(\\d+))?\\s$')
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
        ]),
      password : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(16)]),
      confirmPassword : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(16)])
    });
  }
  saveUser(){
    this.userService.createUser(this.user).subscribe(data=>{
      console.log(data)
    }, error=>console.error());
  }
    onSubmit(e){
      this.signuppayload.email = this.signupform.get('email').value;
      this.signuppayload.username = this.signupform.get('username').value;
      this.signuppayload.mobileNumber = this.signupform.get('mobileNumber').value;
      this.signuppayload.password = this.signupform.get('password').value;
      this.signuppayload.confirmPassword = this.signupform.get('confirmPassword').value;
      // this.router.navigate(['/login']);
     
    }
    signupfunc(){
      this.saveUser();
      console.log(this.user)
      console.log("working")
    }
}