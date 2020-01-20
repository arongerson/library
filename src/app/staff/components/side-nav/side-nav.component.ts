import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { Account } from '../../../helpers/interface';
import { AccountService } from '../../../services/account.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  account: Account;

  constructor(
    private accService: AccountService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.account = this.accService.getAccount();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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

  route(url) {
    this.router.navigate(['staff', url]);
  }
}
