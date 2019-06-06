import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-devices-connected',
  templateUrl: './devices-connected.component.html',
  styleUrls: ['./devices-connected.component.css']
})
export class DevicesConnectedComponent implements OnInit {

  devices = [
    {
      name: 'Smartphone',
      description: 'Description',
      content: 'Content'
    }
  ];

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getDevices()
    .subscribe((devices: any) => {
      this.devices = devices;
    });
  }

  refresh() {
    console.log('Refresh');
    // this.devices = this.backend.getDevices();
  }

  add() {
    const rndNmbr = Math.floor(Math.random() * 99) + 1;
    this.devices.push(
      {
        name: 'Device ' + rndNmbr,
        description: 'Description',
        content: 'Content'
      }
    );
  }

}
