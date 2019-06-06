import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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


    this.http.get(generateAPIURL('devices'))
    .subscribe((devices) => {
      this.devicesSubject.next(devices);
    });

    this.http.get(generateAPIURL('interactions'))
    .subscribe((devices) => {
      this.interactionsSubject.next(devices);
    });


    this.socket.on('newDevices', (devices) => {
      this.devicesSubject.next(devices);
    });

    this.socket.on('newInteractions', (interactions) => {

    });
  }// End of constructor()


  getDevices() {
    return this.devicesSubject;
  }

  getInteractions() {
    return this.interactionsSubject;
  }
}
