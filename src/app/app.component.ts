import { Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

interface PointOfInterest {
  description: string,
  geoLocation: object,
  name: string,
  id?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pointsOfInterestCollection: AngularFirestoreCollection<PointOfInterest>;
  pointsOfInterestObservable: Observable<PointOfInterest[]>;
  pointsOfInterest: PointOfInterest[];
  
  snapshot: any;
  constructor(private db: AngularFirestore) { }


  ngOnInit() {
    this.pointsOfInterestCollection = this.db.collection('pointsOfInterest');
    this.pointsOfInterestObservable = this.pointsOfInterestCollection.valueChanges();
    this.pointsOfInterestObservable.subscribe(data => {
      this.pointsOfInterest = data;
    });
  }
  title = 'app';
}
