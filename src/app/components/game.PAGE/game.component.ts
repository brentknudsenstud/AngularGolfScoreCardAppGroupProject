import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableData } from 'src/app/interfaces/table-data';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  images = ["1", "2", "3", "4", "5","6","7","8","9"]
  dataGot:boolean = false;
  course:TableData = {
    "holes": { "data": ["","","","","","","","",""], "total": "" },
    "yards": { "data": ["","","","","","","","",""], "total": "" },
    "pars": { "data": ["","","","","","","","",""], "total": "" },
    "handicaps": { "data": ["","","","","","","","",""], "total": "" },
    "players": [
        { "name": "", "data": ["","","","","","","","",""], "total": "" },
    ]
}


  constructor(
    public td: TableDataService,
    private route: Router,
    private fb: FirebaseService,
  ) { }


  ngOnInit(): void {
    if (this.td.loadPass === false) {
      this.route.navigate(['/loadin'])
    }
    else {
      this.course = this.td.course;
      this.dataGot = true;
    }
  }


  addScoreData(player: any) {
    let total: number = 0;
    for (let i = 0; i < player.data.length; i++){
      if(player.data[i] === ""){
        
      } else {
        let current = Number(player.data[i]);
        total = total + current;
      }
    }
    let totalString = String(total);
    player.total = totalString;
    return totalString;
  }


  noZero(total: any) {
    if(this.dataGot === true) {
      this.td.course = this.course;
      if(total == 0) { return ""; }
      else { return total }
    }
  }


  endGame() {
    let messageArray: string[] = [];
    this.td.course = this.course;

    for (let p = 0; p < this.course.players.length; p++) {
      let playerMessage = "";
      if (this.course.players[p].data.includes('') || this.course.players[p].data.includes('0') || this.course.players[p].data.includes(null)) {
        playerMessage = `${this.course.players[p].name} didn't end up finished the course`;
        messageArray.push(playerMessage);
      }
      else if (this.course.players[p].total === this.td.course.pars.total) {
        playerMessage = `${this.course.players[p].name} ended the game EXACTLY on par. Cutting it pretty close!`;
        messageArray.push(playerMessage);
      }
      else if (Number(this.course.players[p].total) > Number(this.td.course.pars.total)) {
        playerMessage = `${this.course.players[p].name} ended the game ${this.td.totalToPart(this.course.players[p].total)} points over par. I'd try harder next time. :)`;
        messageArray.push(playerMessage);
      }
      else if (Number(this.course.players[p].total) < Number(this.td.course.pars.total)) {
        playerMessage = `AMAZING! ${this.course.players[p].name} ended the game ${this.td.totalToPart(this.course.players[p].total)} points under par! Congratulations!`;
        messageArray.push(playerMessage);
      }
    }
    this.td.gameEndMessages = messageArray;
    document.getElementById("popUp").className = "popup-background";
  }

  closePopup() {
    document.getElementById("popUp").className = "popup-background noDisplay";
  }

  resetGame() {
    this.fb.clearData();
    this.route.navigate(['/setup']);
  }
  
}