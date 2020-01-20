import { Component, OnInit, OnDestroy } from '@angular/core';
import { GqlService } from '../../services/gql.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  accounts = [];
  accountsSubscription: any;
  deleteStudentSubscription: any;
  returnSubscription: any;

  constructor(
    private gql: GqlService,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.accountsSubscription && this.accountsSubscription.unsubscribe();
    let feedback = this.gql.getStudents();
    this.accountsSubscription = feedback.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  formatName(student) {
    return `${student.firstname} ${student.lastname}`;
  }

  lendBook(id) {
    this.router.navigate(['staff/lend-book', id]);
  }

  editStudent(id) {
    this.router.navigate(['staff/edit-student', id]);
  }

  deleteStudent(id) {
    let confirmDelete = confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      let feedback = this.api.delete(`staff/student/${id}`);
      this.deleteStudentSubscription = feedback.subscribe(data => {
        this.openSnackBar("student deleted", "Close");
        this.loadStudents();
      }, error => {
        this.openSnackBar("student could not be deleted", "Close");
      });
    }
  }

  returnBook(id) {
    let form = this.getForm(id);
    let feedback = this.api.post('staff/return', form);
    this.returnSubscription && this.returnSubscription.unsubscribe();
    this.returnSubscription = feedback.subscribe(data => {
      this.openSnackBar("the book has been returned", "Close");
      this.loadStudents();
    }, error => {
      this.openSnackBar("the book could not be returned", "Close");
    });
  }

  getForm(id) {
    return {
      lendingId: id,
      returnDate: new Date()
    };
  }

  ngOnDestroy() {
    this.accountsSubscription && this.accountsSubscription.unsubscribe();
    this.deleteStudentSubscription && this.deleteStudentSubscription.unsubscribe();
    this.returnSubscription && this.returnSubscription.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
