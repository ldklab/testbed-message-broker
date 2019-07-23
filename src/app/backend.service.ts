import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Interaction } from './models/interaction.model';
import { Device } from './models/device.model';
import {MatSnackBar} from '@angular/material/snack-bar';

const API_BASE_URL = 'http://localhost:3018/api/';
function generateAPIURL(endpoint) {
  return API_BASE_URL + endpoint;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  devices: any = [];
  interactions: any = [];

  devicesSubject;
  interactionsSubject;

  constructor(private socket: Socket,
              private http: HttpClient,
              private snackBar: MatSnackBar) {

    this.devicesSubject = new Subject<any>();
    this.interactionsSubject = new Subject<any>();


    this.http.get<Device[]>(generateAPIURL('devices'))
    .subscribe((devices) => {
      this.processNewDevices(devices);
    });

    this.http.get<Interaction[]>(generateAPIURL('interactions'))
    .subscribe((interactions) => {
      this.processNewInteractions(interactions);
    });


    this.socket.on('newDevices', (devices) => {
      this.processNewDevices(devices);
    });

    this.socket.on('newInteractions', (interactions) => {
      this.processNewInteractions(interactions);
    });
  }// End of constructor()


  processNewInteractions(interactions) {
    /*const newInteractions = interactions.map(x => {
      return {
        id: x._id,
        ...x
      };
    });
    this.interactionsSubject.next(newInteractions);
    */
   // No need to do this anymore
   this.interactionsSubject.next(interactions);
  }

  processNewDevices(devices) {
    this.devicesSubject.next(devices);
  }



  // ---------- DEVICES ----------
  getDevices() {
    return this.devicesSubject;
  }

  postDevice(device: Device) {
    return this.http.post(generateAPIURL('devices'), device);
  }

  scanDevices() {
    return this.http.get<Device[]>(generateAPIURL('devices/scan'));
  }

  addDevice(id) {
    return this.http.post(generateAPIURL('devices/scan'), {id});
  }

  // ---------- END DEVICES ----------



  // ---------- INTERACTIONS ----------
  getInteractions() {
    return this.interactionsSubject;
  }

  postInteraction(interaction: Interaction) {
    return this.http.post(generateAPIURL('interactions'), interaction);
  }

  deleteInteraction(interaction: Interaction) {
    return this.http.delete(generateAPIURL('interactions/' + interaction._id));
  }

  // ---------- END INTERACTIONS ----------


  snackBarMessage(message: string){
    this.snackBar.open(message, 'Dismiss');
  }
}
