import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { tap, map, filter, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/TypicodeUser';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  errorMessage: string = '';
  users: User[] = [];

  @ViewChild('email', {static: true}) email!: ElementRef;

  constructor (private userService: UserService) {
    this.getUsers().subscribe(users => this.users = users);
  }

  ngOnInit() {
    fromEvent(this.email.nativeElement, 'keyup').
      pipe(
       //tap(x => console.log('Elemento original:', x)),
       map((x: any) => x.target.value),
       //tap(x => console.log('Después de .map((x: any) => x.target.value):', x)),
       filter(x => x.length > 3),
       //tap(x => console.log('Después de .filter(x => x.length > 3)', x)),
       debounceTime(500),
       //tap(x => console.log('Después de .debounceTime(500)', x)),
       distinctUntilChanged(),
       //tap(x => console.log('Después de .distinctUntilChanged()', x)),
       switchMap((x) => this.getUsers(x))
       //tap(x => console.log('Después de .switchMap((x) => this.getHeroes(x))', x))
      )
      .subscribe(users => {this.users = users; console.log(users)},
                  error =>  this.errorMessage = <any>error
      )

      // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap
  }

  getUsers(email?: string) {
    let filter = '';
    if (email) {
      filter = 'email=' + email;
    }
    return this.userService.getFiltered(filter);
  }

}
