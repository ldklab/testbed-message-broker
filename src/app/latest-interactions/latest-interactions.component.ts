import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-latest-interactions',
  templateUrl: './latest-interactions.component.html',
  styleUrls: ['./latest-interactions.component.css']
})
export class LatestInteractionsComponent implements OnInit {

  interactions;

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.interactions = this.backend.getInteractions();
  }

  refresh() {

  }
}
