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
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss', '../../../shared/css/form.scss']
})
export class NewStudentComponent implements OnInit, OnDestroy {
  public feedback: string = '';
  public feedbackClass: string = '';
  public hide: boolean = true;
  public submitted: boolean = false;

  loadStudentSubscription: any;
  createStudentSubscription: any;
  routeSub: any;
  student: any;
  isEdit = false;
  title = "New Student";

  public form = new FormGroup({
    username: new FormControl('', this.validation.getNameValidation()),
    firstname: new FormControl('', this.validation.getNameValidation()),
    lastname: new FormControl('', this.validation.getNameValidation())
  });

  constructor(
    private location: Location,
    private validation: ValidationService,
    private api: ApiService,
    private util: UtilService,
    private gql: GqlService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let href: string = this.router.url;
      if (href.includes('staff/edit')) {
        let id = parseInt(params['studentId']);
        this.isEdit = true;
        this.title = "Edit Student";
        this.loadStudent(id);
      }
    });
  }

  loadStudent(id) {
    let feedback = this.gql.getStudent(id);
    this.loadStudentSubscription && this.loadStudentSubscription.unsubscribe();
    this.loadStudentSubscription = feedback.subscribe(data => {
      this.student = data;
      this.form.controls.firstname.setValue(this.student.firstname);
      this.form.controls.lastname.setValue(this.student.lastname);
      this.form.controls.username.setValue('dummy');
    }, error => {
      this.openSnackBar('could not load the student', 'Close');
    });
  }

  getErrorMessage(control) {
    return this.validation.getErrorMessage(control);
  }

  createStudent() {
    let form = this.getForm();
    this.submitted = true;
    let feedback = this.api.post('staff/student', form);
    this.submitted = false;
    this.createStudentSubscription && this.createStudentSubscription.unsubscribe();
    this.createStudentSubscription = feedback.subscribe(data => {
      this.submitted = false;
      this.feedback = "student created";
      this.feedbackClass = 'ok';
      this.util.setFormAsPristine(this.form);
    }, error => {
      this.submitted = false;
      this.feedbackClass = 'error';
      this.feedback = `Ooops! ${error.error}`;
    });
  }

  editStudent() {
    let form = this.getForm();
    this.submitted = true;
    let feedback = this.api.put(`staff/student/${this.student.id}`, form);
    this.submitted = false;
    this.createStudentSubscription && this.createStudentSubscription.unsubscribe();
    this.createStudentSubscription = feedback.subscribe(data => {
      this.submitted = false;
      this.location.back();
    }, error => {
      this.openSnackBar('could not edit the student: ' + error.error, 'Close');
      this.submitted = false;
      this.feedbackClass = 'error';
    });
  }

  getForm() {
    return {
      username: this.form.controls.username.value,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value
    };
  }

  go() {
    if (this.isEdit) {
      this.editStudent();
    } else {
      this.createStudent();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.createStudentSubscription && this.createStudentSubscription.unsubscribe();
    this.loadStudentSubscription && this.loadStudentSubscription.unsubscribe();
    this.routeSub && this.routeSub.unsubscribe();
  }

}
