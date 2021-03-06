import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  users: any;

  constructor(db: AngularFirestore) {
    db.collection('/users').valueChanges().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

  ngOnInit() {

  }

}
