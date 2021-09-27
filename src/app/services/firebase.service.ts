import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TableDataService } from './table-data.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  session: any = {gameSet: "loading"};
  storageRef: any;

  constructor(
    private db: AngularFirestore,
    ) {
      this.session = {gameSet: "loading"};
      this.db.doc('session/nqdTt9oadCIanSx27xca').valueChanges().subscribe(x => {
        this.session = x;
      });
  }

  saveData(apiData, courseData) {
    this.db.doc('session/nqdTt9oadCIanSx27xca').set({
      gameSet: true,
      apiData: apiData,
      course: courseData
    });
  }

  getData() {
    this.db.doc('session/nqdTt9oadCIanSx27xca').valueChanges().subscribe(x => this.session = x);
  }

  clearData() {
    this.db.doc('session/nqdTt9oadCIanSx27xca').set({
      gameSet: false,
      apiData: {},
      course: {}
    });
  }

}
