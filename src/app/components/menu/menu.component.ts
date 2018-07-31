import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'exce-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
