import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from "app/admin-home/admin-home.component";
import { UserListComponent } from "app/user-list/user-list.component";
import { UserEditComponent } from "app/user-edit/user-edit.component";
import { UserAddComponent } from "app/user-add/user-add.component";

@NgModule({
  declarations: [
    AdminHomeComponent,
    UserListComponent,
    UserEditComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    AdminHomeComponent
  ]
})
export class AdminModule { }
