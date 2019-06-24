import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService) {
    this.username = this.authService.getUsername();
  }

  ngOnInit() {
  }

  saveProfile() {
    this.authService.setUsername(this.username).subscribe();
  }
}


