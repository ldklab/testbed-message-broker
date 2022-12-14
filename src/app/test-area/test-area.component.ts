import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Interaction, InteractionInput } from '../models/interaction.model';

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

    // tslint:disable-next-line: forin
    for (const field in myForm.form.controls) {
      values[field] = myForm.form.controls[field].value;
    }

    console.log(values);
    console.log('Custom: ', this.customInputs);

    // ---------- GENERATING INTERACTION ----------
    const interaction: Interaction = {
      title: values.title,
      description: values.description,
      instructions: values.instructions ? values.instructions.split(';') : [],
      level: values.level,
      device: values.device,
      inputs: this.customInputs
    };

    // Check if title&&name&&type are set for each input field
    let customValid = true;
    interaction.inputs.forEach(input => {
      console.log('Input: ', input);
      if ((input.title.length === 0) || (input.name.length === 0) || (input.type.length === 0)) {
        this.backend.snackBarMessage('Please fill the custom input(s) properly');
        customValid = false;
      }
    });
    if (!customValid) { return; }

    console.log('Interaction: ', interaction);

    this.backend.postInteraction(interaction)
    .subscribe(response => {
      console.log('API Response: ', response);
    }, error => {
      console.log('API Error: ', error);
      this.backend.snackBarMessage(error.error.message);
    });

    this.resetForm(myForm);
  }

  removeInput(index) {
    this.customInputs = this.customInputs.filter((v, i, a) => i !== index);
  }


  testFields() {
    const newFields: InteractionInput[] = [
      {
        title: 'Device name',
        name: 'device_name',
        type: 'text',
        required: false,
      },
      {
        title: 'Test check',
        name: 'test_check',
        type: 'checkbox',
        required: false,
      },
      {
        title: 'Device type',
        name: 'device_type',
        type: 'select',
        elements: [{text: 'PC', value: 'pc'}, {text: 'Smart camera', value: 'smart_camera'}],
        required: false,
      },
      {
        title: 'First button',
        name: 'button_one',
        type: 'button',
        required: false,
      },
      {
        title: 'Second button',
        name: 'button_two',
        type: 'button',
        required: false,
      }
    ];

    this.customInputs.push(...newFields);
  }

  addInput() {
    const newField: InteractionInput = {
      title: '',
      name: '',
      type: '',
      elements: [{text: '', value: ''}],
      required: false,
    };

    this.customInputs.push(newField);
  }

  addElementSelect(elements) {
    elements.push({
      text: '',
      value: ''
    });
  }

  resetForm(myForm) {
    myForm.reset();
    this.customInputs = [];
  }
}
