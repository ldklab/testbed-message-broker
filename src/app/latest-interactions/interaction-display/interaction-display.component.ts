import { Component, OnInit, Input } from '@angular/core';
import { Interaction } from 'src/app/models/interaction.model';

@Component({
  selector: 'app-interaction-display',
  templateUrl: './interaction-display.component.html',
  styleUrls: ['./interaction-display.component.css']
})
export class InteractionDisplayComponent implements OnInit {

  @Input() interaction: Interaction;

  constructor() { }

  ngOnInit() {
  }

  isBoolean(v) {
    return ((v === 'true'));
  }

}
