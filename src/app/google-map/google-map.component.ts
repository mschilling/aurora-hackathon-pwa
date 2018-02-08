import { Component, OnInit } from '@angular/core';
import { GeoService } from '../geo.service';
@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    lat: number;
    lng: number;
    markers: any;
    constructor(private geo: GeoService) { }
    ngOnInit() {
      // this.geo.seedDatabase();
      this.getUserLocation()
      this.geo.hits.subscribe(hits => this.markers = hits);
    }
    private getUserLocation() {
     /// locate the user
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;

         this.geo.getLocations(500, [this.lat, this.lng])
       });
     }
   }
 }