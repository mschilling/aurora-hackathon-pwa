import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material'; 


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

  public navigationRoutes: Array<NavigationRoutes>;

  constructor(public router: Router, public sidemenu: MatSidenav) {
    this.navigationRoutes = [
      {
        name: 'Home',
        url: 'home'
      },
      {
        name: 'Profile',
        url: 'profile'
      },
      {
        name: 'Social',
        url: 'social'
      }
    ]
  }

  navigate(rout) {
    this.sidemenu.toggle();
    this.router.navigateByUrl(rout);
  }
  ngOnInit() {
  }
  
}
