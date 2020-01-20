import { Component, OnInit, OnDestroy } from '@angular/core';
import { GqlService } from '../../services/gql.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  account: any;
  accountSubscription: any;

  constructor(
    private gql: GqlService
  ) { }

  ngOnInit() {
    this.loadAccount();
  }

  loadAccount() {
    let feedback = this.gql.getStudentAccount();
    this.accountSubscription = feedback.subscribe(data => {
      this.account = data;
    }, error => {
      alert('could not load data');
    });
  }

  ngOnDestroy() {
    this.accountSubscription && this.accountSubscription.unsubscribe();
  }

}
