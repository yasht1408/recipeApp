import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  switchAuth() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading =true;
    
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
     } else {
      authObs = this.authService.signUp(email, password);
     }
      authObs.subscribe(resData=>{
      this.router.navigate(['/recipes']);
      console.log(resData);
      this.isLoading = false;
    },
    errorMessage=> {
      console.log(errorMessage);
      this.isLoading = false;
      this.error = errorMessage;
    })
    form.reset();
  }
}
