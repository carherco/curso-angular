import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminListComponent,
    AdminEditComponent,
    AdminAddComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    AdminListComponent
  ]
  declarations: []
})
export class AdminModule { }
