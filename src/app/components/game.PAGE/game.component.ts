import { Component, OnInit } from '@angular/core';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(
    private gameData: TableDataService,
  ) { }

  ngOnInit(): void {
    console.log(this.gameData.course);
    console.log(this.gameData.apiData);
  }

}
