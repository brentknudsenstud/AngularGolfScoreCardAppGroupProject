import { Component, OnInit } from '@angular/core';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [TableDataService]
})

export class CardComponent implements OnInit {
  carddata = [
//     {holename: "hole1",// this.tabledata.course.holes.data[0],
//     par: 4,
//     yardage: 360,
//     handicap: 10,
//     imagenumber: 1

// }
  ]

  constructor(
    private tabledata: TableDataService
    ) 
  {
    this.carddata = tabledata.course.holes.data
   }

  ngOnInit(): void {
  }

}
