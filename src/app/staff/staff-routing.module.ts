import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { NewBookComponent } from './components/new-book/new-book.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { LendBookComponent } from './components/lend-book/lend-book.component';
import { ReturnBookComponent } from './components/return-book/return-book.component';
import { BooksComponent } from './components/books/books.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { StudentsComponent } from './components/students/students.component';

const userRoutes: Routes = [
  {
    path: 'staff',
    component: SideNavComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: BooksComponent },
      { path: 'books', component: BooksComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'add-student', component: NewStudentComponent },
      { path: 'add-book', component: NewBookComponent },
      { path: 'lend-book', component: LendBookComponent },
      { path: 'return-book', component: ReturnBookComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
