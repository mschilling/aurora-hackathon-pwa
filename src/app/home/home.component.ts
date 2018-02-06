import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface PointOfInterest {
  description: string,
  geoLocation: object,
  name: string,
  id?: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  pointsOfInterestCollection: AngularFirestoreCollection<PointOfInterest>;
  pointsOfInterestObservable: Observable<PointOfInterest[]>;
  pointsOfInterest: PointOfInterest[];

  snapshot: any;
  constructor(private db: AngularFirestore) { 
    this.pointsOfInterestCollection = this.db.collection('pointsOfInterest');
    this.pointsOfInterestObservable = this.pointsOfInterestCollection.valueChanges();
    this.pointsOfInterestObservable.subscribe(data => {
      this.pointsOfInterest = data;
    });
  }

}
