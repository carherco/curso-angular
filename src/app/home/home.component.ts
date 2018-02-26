import { Component, OnInit } from '@angular/core';

import { User } from 'app/user';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {
    this.users = [];
   }

  ngOnInit() {
      // get users from secure api end point
      this.userService.getAll()
          .subscribe(users => {
              this.users = users;
          });
  }


}
