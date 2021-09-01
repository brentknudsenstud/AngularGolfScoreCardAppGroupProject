import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  playerList = [];
  newPlayerValue = "";

  constructor(
    private http: HttpClient,
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
    console.log("course: ", this.gameCourse);
    console.log("tee: ", this.teeSelect);
    console.log("holes: ", this.holeSelect);
  }

  setupSubmit() {
    console.log("hi");
  }




}
