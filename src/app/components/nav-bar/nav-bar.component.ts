import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private gameData: TableDataService,
    private db: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.db.saveData(this.gameData.apiData, this.gameData.course);
  }

  reset() {
    this.db.clearData();
    this.router.navigate(['/setup']);
  }

}
