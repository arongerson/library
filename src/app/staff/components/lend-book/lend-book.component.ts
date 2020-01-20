import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GqlService } from '../../services/gql.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.scss', '../../../shared/css/form.scss']
})
export class LendBookComponent implements OnInit, OnDestroy {

  public feedback: string = '';
  public feedbackClass: string = '';
  public hide: boolean = true;
  public submitted: boolean = false;

  public form = new FormGroup({
    lendingDate: new FormControl(''),
    dueDate: new FormControl('')
  });

  routeSub: any;
  lendBookSubscription: any;
  loadBooksSubscription: any;
  loadStudentSubscription: any;
  books = [];
  student: any;
  displayedColumns: string[] = [
    'select', 'title', 'author', 'isbn', 'availableCopies'
  ];
  dataSource = new MatTableDataSource(this.books);
  selection = new SelectionModel(false, []);

  constructor(
    private route: ActivatedRoute,
    private gql: GqlService,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let id = parseInt(params['studentId']);
      this.loadBooks();
      this.loadStudent(id);
    });
  }

  loadStudent(id) {
    let feedback = this.gql.getStudent(id);
    this.loadStudentSubscription && this.loadStudentSubscription.unsubscribe();
    this.loadStudentSubscription = feedback.subscribe(student => {
      this.student = student;
    }, error => {
      this.openSnackBar('could not load the student.', 'Close');
    })
  }

  loadBooks() {
    let feedback = this.gql.getBooks();
    this.loadBooksSubscription && this.loadBooksSubscription.unsubscribe();
    this.loadBooksSubscription = feedback.subscribe(books => {
      this.books = books;
      this.dataSource = new MatTableDataSource(books);
    }, error => {
      this.openSnackBar('could not load books.', 'Close');
    })
  }

  formatName(student) {
    if (student) {
      return `${student.firstname} ${student.lastname}`;
    }
    return '';
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  lendBook() {
    let form = this.getForm();
    let feedback = this.api.post('staff/lend', form);
    this.lendBookSubscription && this.lendBookSubscription.unsubscribe();
    this.lendBookSubscription = feedback.subscribe(data => {
      this.openSnackBar("book lent successfully.", "Close");
      this.loadBooks();
    }, error => {
      this.openSnackBar("the book could not be lent.", "Close");
    });
  }

  getForm() {
    return {
      bookId: this.selection.selected[0].id,
      studentId: this.student.id,
      lendDate: this.form.controls.lendingDate.value,
      dueDate: this.form.controls.dueDate.value,
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.lendBookSubscription && this.lendBookSubscription.unsubscribe();
    this.loadBooksSubscription && this.loadBooksSubscription.unsubscribe();
    this.loadStudentSubscription && this.loadStudentSubscription.unsubscribe();
  }

}
