import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-load-in',
  templateUrl: './load-in.component.html',
  styleUrls: ['./load-in.component.scss']
})
export class LoadInComponent implements OnInit {

  constructor(
    private db: FirebaseService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.navigation()
  }

  navigation() {
    let failState = 0
    let getFirebaseData = setInterval(() => {
      failState = failState + 1;
      if (this.db.session.gameSet === true) {
         this.router.navigate(['/game']);
         clearInterval(getFirebaseData);
      }
      if (this.db.session.gameSet === false) {
        this.router.navigate(['/setup']);
        clearInterval(getFirebaseData);
      }
      if (failState > 50) {
        alert("404 Firebase Not Reached")
        clearInterval(getFirebaseData);
      }
    }, 100);
  }

}
