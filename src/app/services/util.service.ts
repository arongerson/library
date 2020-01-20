import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  insertVariables(query: string, variables: Object) {
    for (var prop in variables) {
      if (variables.hasOwnProperty(prop)) {
          query = query.replace('$' + prop, variables[prop]);
      }
    }
    return query;
  }

  setFormAsPristine(form) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setErrors(null);
    });
  }
}
