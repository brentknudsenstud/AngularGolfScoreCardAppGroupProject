import { Component, Input, OnInit } from '@angular/core';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [TableDataService]
})

export class CardComponent implements OnInit {
  carddata = [
  
  ]
  @Input()
  courseId;
  constructor(
    private tableDataService: TableDataService
    ) 
  {
    this.carddata = tableDataService.getCourseData(this.courseId)
   }

  ngOnInit(): void {
  }

}
