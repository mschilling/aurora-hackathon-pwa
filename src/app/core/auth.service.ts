import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
    uid: string,
    email: string,
    photoURL?: string,
    displayName?: string,
    status?: string
}

@Injectable()
export class AuthService {
    user: Observable<User>;
    userId: string;

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router, private db: AngularFireDatabase) {
            this.user = this.afAuth.authState
            .switchMap(user => {
              if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                return Observable.of(null);
              }
            });

            this.afAuth.authState.do(user => {
                if(user) {
                    this.userId = user.uid;
                    console.log(this.userId);
                    this.updateOnConnect();
                    this.updateOnDisconnect();
                }
            }).subscribe();
        }
        private updateStatus(status: string) {
            if (!this.userId) return
            var userDoc = this.afs.doc<any>(`users/${this.userId}`);
            var realTimeUserRef = this.db.object(`users/${this.userId}`);
            const data = {
                status: status
            }
            console.log('updating after connect');
            userDoc.update(data);
            realTimeUserRef.update(data);
        }
        private updateOnConnect() {
            this.db.object('.info/connected').valueChanges().subscribe(data => {
                let status = data ? 'online' : 'offline'
                this.updateStatus(status);
            });
        }

        private updateOnDisconnect() {
            const data = {
                status: 'offline'
            }
            this.db.database.ref(`users/${this.userId}`).onDisconnect().update(data);
        }
        googleLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();
            return this.oAuthLogin(provider);
        }

        private oAuthLogin(provider) {
            return this.afAuth.auth.signInWithPopup(provider)
            .then((credentials) => {
                this.updateUserData(credentials.user);
                this.router.navigate(['/home']);
            });
        }

        private updateUserData(user) {
            const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
            const realtimeUserRef = this.db.object(`users/${user.uid}`);
                const realtimeData = {
                    status: 'offline'
                }
                const data: User = {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL
                };
                return userRef.set(data), realtimeUserRef.set(realtimeData);
        }

        public logout() {
            this.afAuth.auth.signOut();
            this.router.navigate(['']);
        }
}