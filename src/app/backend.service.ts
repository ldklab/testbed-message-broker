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
      description: '5/Jun/19 @ 15:55:12',
      content: 'Content'
    },
    {
      title: 'Second interaction',
      description: '5/Jun/19 @ 15:52:41',
      content: 'Content'
    },
    {
      title: 'Third interaction',
      description: '5/Jun/19 @ 15:37:42',
      content: 'Content'
    },
    {
      title: 'Fourth interaction',
      description: '5/Jun/19 @ 15:30:22',
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
