import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Interaction } from '../models/interaction.model';

@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrls: ['./test-area.component.css']
})
export class TestAreaComponent implements OnInit {

  devices: any = [];

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getDevices()
    .subscribe((devices: any) => {
      this.devices = devices;
    });
  }

  sendRequest(myForm) {

    const values: any = {};
    for (const field in myForm.form.controls) {
      values[field] = myForm.form.controls[field].value;
    }
    console.log(values);

    // ---------- GENERATING INTERACTION ----------
    const interaction: Interaction = {
      title: values.title,
      message: values.message,
      level: values.level
    };

    this.backend.postInteraction(interaction)
    .subscribe(response => {
      console.log(response);
    });


    myForm.reset();
  }

  resetForm(myForm) {
    myForm.reset();
  }
}
