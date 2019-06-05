import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DevicesConnectedComponent } from './devices-connected/devices-connected.component';
import { LatestInteractionsComponent } from './latest-interactions/latest-interactions.component';
import { TestAreaComponent } from './test-area/test-area.component';

import {  MatGridListModule,
          MatToolbarModule,
          MatCardModule,
          MatExpansionModule,
          MatIconModule,
          MatButtonModule,
          MatMenuModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DevicesConnectedComponent,
    LatestInteractionsComponent,
    TestAreaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Angular Material Stuff
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
