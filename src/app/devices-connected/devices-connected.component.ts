import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Device } from '../models/device.model';
import { MatDialog } from '@angular/material';
import { AddDeviceComponent } from './add-device/add-device.component';

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
      content: 'Content',
      address: '192.168.0.?'
    }
  ];

  constructor(private backend: BackendService,
    public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(AddDeviceComponent, {
      width: '60%',
      data: {}
    });
    /*
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
    });*/
  }

}
