import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.css']
})
export class PrivateHeaderComponent implements OnInit {

  //username: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    //this.username = this.authService.getUsername();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      x => this.router.navigate(['/home'])
    );
  }

  getUsername() {
    return this.authService.getUsername()
  }

}
