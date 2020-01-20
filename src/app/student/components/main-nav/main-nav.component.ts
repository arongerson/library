import { Component, OnInit } from '@angular/core';
import { Account } from '../../../helpers/interface';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  account: Account;

  constructor(
    private accService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.account = this.accService.getAccount();
  }

  changePassword() {

  }

  logout() {
    let feedback = this.accService.logout();
    feedback.subscribe(data => {
      this.router.navigate(['/']);
    }, error => {
      this.router.navigate(['/']);
    });
  }

}
