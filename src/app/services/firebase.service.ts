import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  session: any = {gameSet: undefined}
  storageRef: any;

  constructor(
    private db: AngularFirestore,
    ) {
    this.db.doc('session/Bims3nptXQUcCik7imE4').valueChanges().subscribe(x => this.session = x);
  }

  saveData(apiData, courseData) {
    this.db.doc('session/Bims3nptXQUcCik7imE4').set({
      gameSet: true,
      apiData: apiData,
      course: courseData
    });
  }

  clearData() {
    this.db.doc('session/Bims3nptXQUcCik7imE4').set({
      gameSet: false,
      apiData: {},
      course: {}
    });
  }

}
