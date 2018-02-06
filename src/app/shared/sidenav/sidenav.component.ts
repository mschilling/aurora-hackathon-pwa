import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationRoutes {
  name: string;
  url: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public navigationRoutes: Array <NavigationRoutes>;

  constructor(public router: Router) {
    this.navigationRoutes = [
      {
        name: 'Home',
        url: 'home'
      },
      {
        name: 'Profile',
        url: 'profile'
      }
    ]
   }

  ngOnInit() {
  }

}
