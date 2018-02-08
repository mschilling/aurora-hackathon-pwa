import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';

import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GeoService {

  dbRef: any;
  geoFire: any;e

  hits = new BehaviorSubject([]);

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb) { 
    this.dbRef = fb.database().ref('locations');
    this.geoFire = new GeoFire(this.dbRef);
  }

  setLocation(key:string, coords: Array<number>) {
    this.geoFire.set(key, coords)
    .then(_ => console.log('locations added'))
    .catch(err => console.log(err))
  }

  getLocations(radius:number, coords: Array<number>){
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
      let hit = {
        location: location,
        distance: distance
      }

      let currentHits = this.hits.value
      currentHits.push(hit)
      this.hits.next(currentHits)
    })
  }

  seedDatabase() {
    let dummyPoints = [
      [52.510095, 6.091458],
      [52.509927, 6.095474],
      [52.508428, 6.091944],
      [52.512094, 6.092715],
      [52.508599, 6.091273]
    ]
    dummyPoints.forEach((val, idx) => {
      let name = `dummy-location-${idx}`
      console.log(idx)
      this.setLocation(name, val)
    })
  }
}
