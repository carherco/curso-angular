import { User } from 'app/model/TypicodeUser';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-crud-basic',
  templateUrl: './user-crud-basic.component.html',
  styleUrls: ['./user-crud-basic.component.css']
})
export class UserCrudBasicComponent implements OnInit {

  title = 'CRUD BÁSICO';
  users = [];
  lastId = 10;
  newUser: User;
  selectedUser: User;
  hide_without_phone: boolean = false;

  constructor(private userService: UserService) {
    this.newUser = {
      id: this.lastId + 1,
      name: ''
    };

    this.userService.getAll().subscribe(
      users => this.users = users
    );
  }

  ngOnInit() {
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  add(): void {
    console.log(this.newUser);
    this.users.push(this.newUser);
    this.lastId = this.lastId +1;
    this.resetNewHero();
  }

  resetNewHero() {
    this.newUser = {
      id: this.lastId + 1,
      name: ''
    };
  }

  /**
   * Función delete recibiendo el índice del usuario que se quiere eliminar
   * @param index
   */
  deleteX(index) {
    this.users.splice(index, 1);
  }

  /**
   * Función delete recibiendo el usuario que se quiere eliminar
   * @param user
   */
  delete(user: User) {
    //this.users = this.users.filter(function(el) { return el.id != user.id; });
    this.users = this.users.filter( el => el.id != user.id );
  }

}
