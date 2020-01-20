import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ValidationService } from '../../../services/validation.service';
import { ApiService } from '../../../services/api.service';
import { UtilService } from '../../../services/util.service';
import { GqlService } from '../../services/gql.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['../../../shared/css/form.scss']
})
export class NewBookComponent implements OnInit, OnDestroy {

  createBookSubscription: any;
  loadBookSubscription: any;
  routeSub: any;

  public feedback: string = '';
  public feedbackClass: string = '';
  public hide: boolean = true;
  public submitted: boolean = false;
  title = "New Book"
  public isEdit = false;
  book: any;

  public form = new FormGroup({
    title: new FormControl('', this.validation.getBookTitleValidation()),
    author: new FormControl('', this.validation.getAuthorValidation()),
    isbn: new FormControl('', this.validation.getIsbnValidation()),
    copies: new FormControl('', this.validation.getCopiesValidation())
  });

  constructor(
    private location: Location,
    private validation: ValidationService,
    private api: ApiService,
    private gql: GqlService,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let href: string = this.router.url;
      if (href.includes('staff/edit')) {
        let id = parseInt(params['bookId']);
        this.isEdit = true;
        this.title = "Edit Book";
        this.loadBook(id);
      }
    });
  }

  loadBook(id) {
    let feedback = this.gql.getBook(id);
    this.loadBookSubscription = feedback.subscribe(data => {
      this.book = data;
      this.form.controls.title.setValue(this.book.title);
      this.form.controls.author.setValue(this.book.author);
      this.form.controls.isbn.setValue(this.book.isbn);
      this.form.controls.copies.setValue(1);
    }, error => {
      this.openSnackBar('could not load the book', 'Close');
    });
  }

  getErrorMessage(control) {
    return this.validation.getErrorMessage(control);
  }

  createBook() {
    let form = this.getForm();
    this.submitted = true;
    let feedback = this.api.post('staff/book', form);
    this.submitted = false;
    this.createBookSubscription = feedback.subscribe(data => {
      this.submitted = false;
      this.feedback = "book added";
      this.feedbackClass = 'ok';
      this.util.setFormAsPristine(this.form);
    }, error => {
      this.submitted = false;
      this.feedbackClass = 'error';
      this.feedback = `Ooops! ${JSON.stringify(error)}`;
    });
  }

  editBook() {
    let form = this.getForm();
    this.submitted = true;
    let feedback = this.api.put(`staff/book/${this.book.id}`, form);
    this.submitted = false;
    this.createBookSubscription = feedback.subscribe(data => {
      this.submitted = false;
      this.location.back();
    }, error => {
      this.submitted = false;
      this.feedbackClass = 'error';
      this.feedback = `Ooops! ${error.error}`;
      this.location.back();
    });
  }

  getForm() {
    return {
      title: this.form.controls.title.value,
      author: this.form.controls.author.value,
      isbn: this.form.controls.isbn.value,
      copies: this.form.controls.copies.value
    };
  }

  go() {
    if (this.isEdit) {
      this.editBook();
    } else {
      this.createBook();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.createBookSubscription && this.createBookSubscription.unsubscribe();
    this.loadBookSubscription && this.loadBookSubscription.unsubscribe();
    this.routeSub && this.routeSub.unsubscribe();
  }

}

