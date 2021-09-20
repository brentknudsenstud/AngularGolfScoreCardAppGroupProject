import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-load-in',
  templateUrl: './load-in.component.html',
  styleUrls: ['./load-in.component.scss']
})
export class LoadInComponent implements OnInit {

  constructor(
    private td: TableDataService,
    private fb: FirebaseService,
    ) { }

  ngOnInit(): void {
    this.td.loadPass = true;
    this.td.navigation();
    this.td.course = this.fb.session.course;
    this.td.apiData = this.fb.session.apiData;
  }

}
