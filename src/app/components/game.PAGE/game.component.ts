import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(
    private td: TableDataService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    if (this.td.loadPass === false) {
      this.route.navigate(['/loadin'])
    }
  }

}
