import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-devices-connected',
  templateUrl: './devices-connected.component.html',
  styleUrls: ['./devices-connected.component.css']
})
export class DevicesConnectedComponent implements OnInit {

  devices = [
    {
      online: true,
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

    const newDevice: Device = {
      online: true,
      name: 'Device ' + rndNmbr,
      description: 'Description',
      capabilities: {
        in: ['Touch'],
        out: ['Video']
      }
    };

    this.backend.postDevice(newDevice)
    .subscribe(result => {
      console.log(result);
    });
  }

}
