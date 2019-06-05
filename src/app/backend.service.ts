import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  devices = [
    {
      name: 'Smartphone',
      description: 'Description',
      content: 'Content'
    },
    {
      name: 'Smart TV',
      description: 'Description',
      content: 'Content'
    },
    {
      name: 'SONOS Speaker',
      description: 'Description',
      content: 'Content'
    }
  ];

  interactions = [
    {
      title: 'First interaction',
      description: '',
      content: 'Content'
    },
    {
      title: 'Second interaction',
      description: '',
      content: 'Content'
    },
    {
      title: 'Third interaction',
      description: '',
      content: 'Content'
    },
    {
      title: 'Fourth interaction',
      description: '',
      content: 'Content'
    }
  ];

  constructor() { }

  getDevices() {
    return [...this.devices];
  }

  getInteractions() {
    return [...this.interactions];
  }
}
