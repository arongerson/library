import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { AccountComponent } from './components/account/account.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AuthGuard } from './guards/auth.guard';

import { 
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatMenuModule,
} from '@angular/material';



@NgModule({
  declarations: [
    AccountComponent, 
    MainNavComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
  ],
  providers: [
    AuthGuard
  ]
})
export class StudentModule { }
