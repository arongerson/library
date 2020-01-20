import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { Account } from '../../helpers/interface';
import { ValidationService } from '../../services/validation.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public feedback: string = '';
  public feedbackClass: string = '';
  public hide: boolean = true;
  public submitted: boolean = false;

  public form = new FormGroup({
    username: new FormControl('', this.validation.getNameValidation()),
    password: new FormControl('', this.validation.getNameValidation())
  });

  constructor(
    private api: ApiService,
    private accountService: AccountService,
    private validation: ValidationService,
  ) {
  }

  ngOnInit() {
    this.config();
  }

  config() {
    if (this.accountService.isLoggedIn()) {
      this.accountService.redirect();
    } else {
      let feedback = this.accountService.logout();
    }
  }

  getErrorMessage(control) {
    return this.validation.getErrorMessage(control);
  }

  login() {
    let loginForm = this.getLoginForm();
    this.submitted = true;
    let feedback = this.accountService.login(loginForm);
    feedback.subscribe(data => {
      this.submitted = false;
      if (data == -1) {
        this.loginFail();
      } else {
        this.loginSuccess(data);
      }
    }, error => {
      console.log(JSON.stringify(error))
    });
  }

  loginSuccess(data: any) {
    this.accountService.setAccount(data as Account);
    this.accountService.redirect();
  }

  loginFail() {
    this.feedback = "incorrect username and/or password";
    this.feedbackClass = 'error';
    this.form.reset();
  }

  getLoginForm() {
    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;
  	return {
      "username": username,
      "password": password
    };
  }
}
