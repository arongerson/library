import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GqlService } from '../../services/gql.service';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  books = [];
  bookSubscription: any;
  returnSubscription: any;
  deleteCopySubscription: any;
  copySubscription: any;

  constructor(
    private gql: GqlService,
    private api: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.removeExistingSubscription();
    let feedback = this.gql.getBooksWithLending();
    this.bookSubscription = feedback.subscribe(books => {
      this.books = books;
    }, error => {
      this.openSnackBar('error loading books', "Close");
    });
  }

  removeExistingSubscription() {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }

  returnBook(id) {
    let form = this.getForm(id);
    let feedback = this.api.post('staff/return', form);
    this.returnSubscription = feedback.subscribe(data => {
      this.openSnackBar("the book has been returned", "Close");
      this.loadBooks();
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

  deleteCopy(id) {
    let confirmDelete = confirm("Are you sure you want to delete this copy?");
    if (confirmDelete) {
      let feedback = this.api.delete(`staff/book-copy/${id}`);
      this.deleteCopySubscription = feedback.subscribe(data => {
        this.openSnackBar("book copy deleted", "Close");
        this.loadBooks();
      }, error => {
        this.openSnackBar("copy could not be deleted", 'Close');
      });
    }
  }

  deleteBook(id) {
    let confirmDelete = 
    confirm("Are you sure you want to delete this book and all its copies?");
    if (confirmDelete) {
      let feedback = this.api.delete(`staff/book/${id}`);
      this.deleteCopySubscription = feedback.subscribe(data => {
        this.openSnackBar("book deleted", "Close");
        this.loadBooks();
      }, error => {
        this.openSnackBar("copy could not be deleted", 'Close');
      });
    }
  }

  addCopy(id) {
    let feedback = this.api.post(`staff/book/${id}/copy`, null);
    this.copySubscription = feedback.subscribe(data => {
      this.openSnackBar("book deleted", "Close");
      this.loadBooks();
    }, error => {
      this.openSnackBar("copy could not be deleted", 'Close');
    });
  }

  editBook(id) {
    this.router.navigate(['staff/edit-book', id]);
  }

  formatName(student) {
    return `${student.firstname} ${student.lastname}`;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.bookSubscription && this.bookSubscription.unsubscribe();
    this.returnSubscription && this.returnSubscription.unsubscribe();
    this.deleteCopySubscription && this.deleteCopySubscription.unsubscribe();
    this.copySubscription && this.copySubscription.unsubscribe();
  }

}
