import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { Device } from 'src/app/models/device.model';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  devices: Device[];
  loading: boolean;

  columnsToDisplay: string[] = ['name', 'ip', 'lastActive', 'addButton'];

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.loading = true;
    this.backend.scanDevices()
    .subscribe(devices => {
      this.loading = false;
      this.devices = devices;
    });
  }

  addDevice(id) {
    console.log('Adding device id: ' + id);

    this.backend.addDevice(id)
    .subscribe(result => {
      console.log(result);
    });
  }

}
