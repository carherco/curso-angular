import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  errorMessage: String;
  users: any[];
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
                    .subscribe(
                       x => this.users = x,
                       x =>  this.errorMessage = <any>x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
