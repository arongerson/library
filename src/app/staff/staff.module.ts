import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NewBookComponent } from './components/new-book/new-book.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { LendBookComponent } from './components/lend-book/lend-book.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BooksComponent } from './components/books/books.component';
import { StudentsComponent } from './components/students/students.component';

import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { StaffRoutingModule } from './staff-routing.module';
import { AuthGuard } from './guards/auth.guard';

import { 
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatDividerModule,
  MatMenuModule,
  MatTableModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  declarations: [
    NewBookComponent, 
    NewStudentComponent, 
    LendBookComponent, 
    SideNavComponent, 
    BooksComponent, 
    StudentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    StaffRoutingModule,
    ApolloModule,
    HttpLinkModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatDividerModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    MatDatepickerModule
  ]
})
export class StaffModule { }
