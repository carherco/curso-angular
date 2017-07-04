import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClickMeComponent } from './click-me/click-me.component';
import { KeyUpComponent } from './key-up/key-up.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroService } from 'app/hero.service';
import { ColdObservablesComponent } from './cold-observables/cold-observables.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickMeComponent,
    KeyUpComponent,
    HeroFormComponent,
    HeroListComponent,
    ColdObservablesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
