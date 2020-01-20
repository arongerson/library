import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../helpers/interface';
import { BASE_SERVER_URL } from '../helpers/path';
import {
  ROLE_STAFF,
  ROLE_STUDENT
} from '../helpers/constants';

const ACCOUNT_KEY = "account";

export const defaultHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
  withCredentials: true
};

const getHttpOptions = {
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private redirectUrl: string = '';
  private account: Account;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  isLoggedIn() {
    let account = this.getAccount();
    return account !== null && account !== undefined;
  }

  getAccount(): Account {
    if (this.account !== null && this.account !== undefined) {
      return this.account;
    }
    return JSON.parse(sessionStorage.getItem(ACCOUNT_KEY));
  }

  setAccount(account: Account) {
    this.account = account;
    sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }

  redirect(): void {
    let role = this.getAccount().role;
    let url = '';
    if (role === ROLE_STUDENT) {
      url = 'student/';
    } else if (role === ROLE_STAFF) {
      url = 'staff/';
    }
    this.router.navigate([url]);
  }

  login(form: any) {
    let username = form.username;
    let password = form.password;
    return this.http.post(
      this.getUrl('login'),
      encodeURI(`username=${username}&password=${password}`),
      defaultHttpOptions
    );
  }

  logout() {
    sessionStorage.removeItem(ACCOUNT_KEY);
    this.account = null;
    return this.http.get(this.getUrl('logout'), getHttpOptions);
  }

  getUrl(path) {
    return `${BASE_SERVER_URL}${path}`;
  }
}
