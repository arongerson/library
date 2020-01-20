import { Injectable } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-angular-link-http';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { BASE_SERVER_URL } from '../../helpers/path';
import { STUDENT_ACCOUNTS, BOOKS, BOOKS_WITH_LENDING, STUDENT, BOOK } from '../helpers/queries';

const STAFF_GQL = BASE_SERVER_URL + 'staff/gql';

@Injectable({
  providedIn: 'root'
})
export class GqlService {

  graphQLName = 'staff';

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private util: UtilService
  ) { 
    this.apollo.createNamed(this.graphQLName, {
      link: this.httpLink.create({ withCredentials: true, uri: `${STAFF_GQL}`}),
      cache: new InMemoryCache({
        addTypename: false
      })
    });
  }

  getStudents() {
    return this.fetch(
      STUDENT_ACCOUNTS, 
      'accounts', 
      { }
    );
  }

  getBooksWithLending() {
    return this.fetch(
      BOOKS_WITH_LENDING, 
      'books', 
      { }
    );
  }

  getStudent(id) {
    return this.fetch(
      STUDENT, 
      'student', 
      { studentId: id }
    );
  }

  getBooks() {
    return this.fetch(
      BOOKS, 
      'books', 
      { }
    );
  }

  getBook(id) {
    return this.fetch(
      BOOK, 
      'book', 
      { bookId: id}
    );
  }

  fetch(query, gqlName, vars) {
    query = this.util.insertVariables(query, vars);
    return this.apollo.use(this.graphQLName).watchQuery({
      query: gql`${query}`,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map(result => {
        return result.data[gqlName];
      })
    );
  }
}
