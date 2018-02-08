import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { AngularFireModule } from 'angularfire2'; 



@NgModule({
    imports: [
        CommonModule,
        AngularFireModule,
        AngularFirestoreModule
    ],
    declarations: [],
    providers: [
        AuthService
    ]
})

export class CoreModule { }