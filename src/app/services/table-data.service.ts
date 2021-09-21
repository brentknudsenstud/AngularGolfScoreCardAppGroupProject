import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { TableData } from '../interfaces/table-data';
import { RowData } from '../interfaces/row-data';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  course: TableData;
  apiData: any;
  loadPass: boolean = false;

  constructor(
    private db: FirebaseService,
    private route: Router,
  ) { }

  getCourseData(courseId: string) {
    return [
          {holename: "hole1",// this.tabledata.course.holes.data[0],
        par: 4,
        yardage: 360,
        handicap: 10,
        imagenumber: 1}]
  }

  setCourseData(holesArray: string[], teeIndex: number, playerList: string[]) {
    //DECLARING DATA--------------------------------------------------------------------------------------------------
    let holes: RowData = { data: holesArray, total: "total" };
    let yards: RowData = { data: [], total: "" };
    let pars: RowData = { data: [], total: "" };
    let handicaps: RowData = { data: [], total: "" };

    this.course = {
      holes: holes,
      yards: yards,
      pars: pars,
      handicaps: handicaps,
      players: []
    }

    let players: RowData[] = [];

    //YARDS PARS HANDICAPS SETUP--------------------------------------------------------------------------------------
    for (let i = 0; i < holesArray.length; i++) {
      this.course.yards.data.push(this.apiData.data.holes[i].teeBoxes[teeIndex].yards);
      this.course.pars.data.push(this.apiData.data.holes[i].teeBoxes[teeIndex].par);
      this.course.handicaps.data.push(this.apiData.data.holes[i].teeBoxes[teeIndex].hcp);
    }

    this.course.yards.total = this.rowTotal(this.course.yards.data);
    this.course.pars.total = this.rowTotal(this.course.pars.data);
    this.course.handicaps.total = this.rowTotal(this.course.handicaps.data);

    //PLAYER DATA SETUP-----------------------------------------------------------------------------------------------
    for (let p = 0; p < playerList.length; p++) {
      let newPlayer: RowData;
      newPlayer = {
        name: playerList[p],
        data: ["", "", "", "", "", "", "", "", "", "", "", ""],
        total: ""
      }
      newPlayer.total = this.rowTotal(newPlayer.data);
      this.course.players.push(newPlayer);
    }

    //UPLOAD DATA TO FIREBASE-----------------------------------------------------------------------------------------
    this.db.saveData(this.apiData, this.course);
  }


  //TOTALS ROW DATA-------------------------------------------------------------------------------------------------
  rowTotal(data: string[]): string {
    let addUpTotal: number = 0;
    for (let d = 0; d < data.length; d++) {
      let numberData = data[d] == "" ? 0 : Number(data[d]);
      addUpTotal = addUpTotal + numberData;
    }
    let addUpFinal: string = addUpTotal == 0 ? "" : String(addUpTotal);
    return addUpFinal;
  }

  navigation() {
    let failState = 0
    let getFirebaseData = setInterval(() => {
      failState = failState + 1;
      if (this.db.session.gameSet === true) {
        this.course = this.db.session.course;
        this.apiData = this.db.session.apiData;
         this.route.navigate(['/game']);
         clearInterval(getFirebaseData);
      }
      if (this.db.session.gameSet === false) {
        this.route.navigate(['/setup']);
        clearInterval(getFirebaseData);
      }
      if (failState > 50) {
        alert("404 Firebase Not Reached")
        clearInterval(getFirebaseData);
      }
    }, 100);
  }


}
