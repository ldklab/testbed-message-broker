import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Interaction } from '../models/interaction.model';

@Component({
  selector: 'app-latest-interactions',
  templateUrl: './latest-interactions.component.html',
  styleUrls: ['./latest-interactions.component.css']
})
export class LatestInteractionsComponent implements OnInit {

  interactions;

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getInteractions()
    .subscribe((interactions: any) => {
      this.interactions = interactions
      .map(interaction => {
        let dotColor;
        switch (interaction.status) {
          case 1:
            dotColor = '#ffeb3b'; // Pending = yellow
            break;
          case 2:
            dotColor = '#00cc00'; // Completed = Green
            break;
          case 3:
            dotColor = '#d50000'; // Canceled = red
            break;

          default:
            dotColor = '#000000'; // WTF happened? = black
        }

        return {
          ...interaction,
          dotColor
        };
      });
    });
  }

  refresh() {
    console.log('Refresh');
  }

  deleteInteraction(interaction: Interaction) {
    console.log('Deleting ' + interaction.id);
    this.backend.deleteInteraction(interaction)
    .subscribe((result) => {
      console.log(result);
    });
  }
}
