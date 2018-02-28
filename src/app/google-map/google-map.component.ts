import { Component, OnInit } from '@angular/core';
import { GeoService } from '../geo.service';
// import { setInterval } from 'timers';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  lat: number;
  lng: number;
  markers: any;
  selectedRadius: string = "100";
  radius: number;
  constructor(private geo: GeoService) { }
  ngOnInit() {
    // this.geo.seedDatabase();
    this.getUserLocation();

    setInterval(() => {
      this.getUserLocation();
      }, 3000 );

    this.geo.hits.subscribe(hits => this.markers = hits);

  }

  private radiusChange() {
    this.getUserLocation();
  }
  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const radius = parseInt(this.selectedRadius) / 1000;
        this.geo.getLocations(radius, [this.lat, this.lng])
      });
    }
  }
}
