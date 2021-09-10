import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableDataService } from 'src/app/services/table-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  courseSelect = undefined;
  teeSelect = undefined;
  holeSelect = undefined;

  courseList = undefined;
  teeboxArray = [];

  gameCourse = undefined;

  playerList: string[] = [];
  newPlayerValue = "";

  constructor(
    private http: HttpClient,
    private tableData: TableDataService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.http.get("https://golf-courses-api.herokuapp.com/courses").subscribe(x => this.courseList = x);
  }

  //SELECT-COURSE================================================================================================
  courseChanging(id: number) {
    this.teeSelect = undefined;
    this.teeboxArray = [];

    this.http.get(`https://golf-courses-api.herokuapp.com/courses/${id}`).subscribe(payload => {
      this.gameCourse = payload;
      this.tableData.apiData = payload;
      for (let tee in this.gameCourse.data.holes[0].teeBoxes) {
        if (this.gameCourse.data.holes[0].teeBoxes[tee].teeType != "auto change location") {
          this.teeboxArray.push(this.gameCourse.data.holes[0].teeBoxes[tee].teeType);
        }
      }
    });
  }

  //ADD-PLAYER===================================================================================================
  addNewPlayer() {
    this.playerList.push(this.newPlayerValue);
    this.newPlayerValue = "";
  }

  //SUBMIT-INFO==================================================================================================
  submitSetupInfo() {
    const holesData = this.holeSelect == "first" ? ['1','2','3','4','5','6','7','8','9'] : ['10','11','12','13','14','15','16','17','18'];
    const teeIndex: number = this.teeboxArray.indexOf(this.teeSelect);
    
    this.tableData.setCourseData(holesData, teeIndex, this.playerList)
    this.router.navigate(['/game']);
  }

}
