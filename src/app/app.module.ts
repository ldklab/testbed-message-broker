import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DevicesConnectedComponent } from './devices-connected/devices-connected.component';
import { LatestInteractionsComponent } from './latest-interactions/latest-interactions.component';
import { TestAreaComponent } from './test-area/test-area.component';
import { AddDeviceComponent } from './devices-connected/add-device/add-device.component';
import { InteractionDisplayComponent } from './latest-interactions/interaction-display/interaction-display.component';

import {  MatGridListModule,
          MatToolbarModule,
          MatCardModule,
          MatExpansionModule,
          MatIconModule,
          MatButtonModule,
          MatMenuModule,
          MatCheckboxModule,
          MatRadioModule,
          MatFormFieldModule,
          MatInputModule,
          MatDialogModule,
          MatProgressSpinnerModule,
          MatTableModule,
          MatSortModule,
          MatSelectModule,
          MatTabsModule,
          MatSnackBarModule } from '@angular/material';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3019', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DevicesConnectedComponent,
    LatestInteractionsComponent,
    TestAreaComponent,
    AddDeviceComponent,
    InteractionDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    HttpClientModule,
    // SocketIO
    SocketIoModule.forRoot(config),

    // Angular Material Stuff
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddDeviceComponent]
})
export class AppModule { }
