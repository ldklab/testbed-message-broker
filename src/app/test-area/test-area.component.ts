import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Interaction } from '../models/interaction.model';
import { InteractionInput } from '../models/interaction-input.model';

@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrls: ['./test-area.component.css']
})
export class TestAreaComponent implements OnInit {

  devices: any = [];
  customInputs = [];

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

    console.log('Custom: ', this.customInputs);

    // ---------- GENERATING INTERACTION ----------
    const interaction: Interaction = {
      title: values.title,
      description: values.description,
      level: values.level,
      device: values.device,
      inputs: this.customInputs
    };

    this.backend.postInteraction(interaction)
    .subscribe(response => {
      console.log('API Response: ', response);
    });


    this.resetForm(myForm);
  }

  addInput() {
    const newField: InteractionInput = {
      title: 'Device name',
      name: 'device_name',
      type: 'text',
      required: false,
    };

    this.customInputs.push(newField);
  }

  resetForm(myForm) {
    myForm.reset();
    this.customInputs = [];
  }
}
