import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Interaction } from './models/interaction.model';
import { Device } from './models/device.model';

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
              private http: HttpClient) {

    this.devicesSubject = new Subject<any>();
    this.interactionsSubject = new Subject<any>();


    this.http.get<any[]>(generateAPIURL('devices'))
    .subscribe((devices) => {
      const newDevices = devices.map(x => {
        return {
          id: x._id,
          ...x
        };
      });
      this.devicesSubject.next(newDevices);
    });

    this.http.get<any[]>(generateAPIURL('interactions'))
    .subscribe((interactions) => {
      this.processNewInteractions(interactions);
    });


    this.socket.on('newDevices', (devices) => {
      this.devicesSubject.next(devices);
    });

    this.socket.on('newInteractions', (interactions) => {
      this.processNewInteractions(interactions);
    });
  }// End of constructor()


  processNewInteractions(interactions){
    const newInteractions = interactions.map(x => {
      return {
        id: x._id,
        ...x
      };
    });
    this.interactionsSubject.next(newInteractions);
  }


  getDevices() {
    return this.devicesSubject;
  }


  // ---------- INTERACTIONS ----------

  getInteractions() {
    return this.interactionsSubject;
  }

  postInteraction(interaction: Interaction) {
    return this.http.post(generateAPIURL('interactions'), interaction);
  }

  deleteInteraction(interaction: Interaction) {
    return this.http.delete(generateAPIURL('interactions/' + interaction.id));
  }

  // ---------- END INTERACTIONS ----------
}
