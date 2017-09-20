import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'app/authentication.service';
import { AuthService } from "app/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {
    username: '',
    password: ''
  };
  loading = false;
  error = '';

  constructor(
      private router: Router,
      private authService: AuthService) { }

  ngOnInit() {
      // reset login status
      // this.authService.logout();
  }

  login() {
      this.loading = true;
      this.authService.login(this.model.username, this.model.password)
          .subscribe(result => {
              if (result === true) {
                  this.router.navigate(['/admin']);
              } else {
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
              }
          });
  }
}
