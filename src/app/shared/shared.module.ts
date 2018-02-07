import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatToolbarModule, MatMenuModule, MatListModule, MatIconModule, MatButtonModule} from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
    ],
    declarations: [SidenavComponent, WrapperComponent, NavbarComponent],
    exports: [ SidenavComponent, WrapperComponent, NavbarComponent]
})
export class SharedModule {}