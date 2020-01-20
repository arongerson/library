import { Injectable } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-angular-link-http';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { BASE_SERVER_URL } from '../../helpers/path';
import { STUDENT_ACCOUNT } from '../helpers/queries';

const STUDENT_GQL = BASE_SERVER_URL + 'student/gql';

@Injectable({
  providedIn: 'root'
})
export class GqlService {

  graphQLName = 'student';

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private util: UtilService
  ) { 
    this.apollo.createNamed(this.graphQLName, {
      link: this.httpLink.create({ withCredentials: true, uri: `${STUDENT_GQL}`}),
      cache: new InMemoryCache({
        addTypename: false
      })
    });
  }

  getStudentAccount() {
    return this.fetch(
      STUDENT_ACCOUNT, 
      'account', 
      { }
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
