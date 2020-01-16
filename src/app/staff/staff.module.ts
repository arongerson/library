import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBookComponent } from './components/new-book/new-book.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { LendBookComponent } from './components/lend-book/lend-book.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BooksComponent } from './components/books/books.component';
import { StudentsComponent } from './components/students/students.component';

@NgModule({
  declarations: [
    NewBookComponent, 
    NewStudentComponent, 
    LendBookComponent, 
    ReturnBookComponent, 
    SideNavComponent, 
    BooksComponent, 
    StudentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StaffModule { }
