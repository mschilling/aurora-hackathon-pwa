import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    lat: number;
    lng: number;
    constructor() { }
    ngOnInit() {
      this.getUserLocation()
    }
    private getUserLocation() {
     /// locate the user
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
       });
     }
   }
 }