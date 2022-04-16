import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.username = this.authService.getUsername();
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })
    // this.http.get('http://localhost:8000/user', { headers }).subscribe()
  }

  ngOnInit() {
  }

  saveProfile() {
    this.authService.setUsername(this.username).subscribe();
  }
}


