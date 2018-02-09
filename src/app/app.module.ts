import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';

import {CoreModule} from './core/core.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth-guard.service';
import { MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GeoService } from './geo.service';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'social', component: SocialComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    GoogleMapComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase, 'aurora-pwa'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    CoreModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  providers: [AuthGuard, AngularFireAuth, GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
