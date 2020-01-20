import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_SERVER_URL } from '../helpers/path';

const postHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

const getHttpOptions = {
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  post(url: string, form) {
    return this.http.post(this.getUrl(url), form, postHttpOptions);
  }

  put(url: string, form) {
    return this.http.put(this.getUrl(url), form, postHttpOptions);
  }

  get(url: string) {
    return this.http.get(this.getUrl(url), getHttpOptions);
  }

  delete(url: string) {
    return this.http.delete(this.getUrl(url), getHttpOptions);
  }

  getUrl(path) {
    return `${BASE_SERVER_URL}${path}`;
  }
}
