import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { SetupComponent } from './components/setup.PAGE/setup.component';
import { GameComponent } from './components/game.PAGE/game.component';
import { PageNotFoundComponent } from './components/page-not-found.PAGE/page-not-found.component';
import { LoadInComponent } from './components/load-in.PAGE/load-in.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { MaterialModule } from './modules/material.module';
import { CreationComponent } from './components/creation/creation.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    GameComponent,
    PageNotFoundComponent,
    LoadInComponent,
    NavBarComponent,
    CreationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
