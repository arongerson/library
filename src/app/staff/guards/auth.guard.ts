import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ROLE_STAFF } from '../../helpers/constants';
import { Account } from '../../helpers/interface';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let result = this.isStaff();
    if (result === false) {
      this.router.navigate(['/login']);
    }
    return result;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  isStaff(): boolean {
    let account: Account = this.accountService.getAccount();
    return (account === null || account === undefined) ? false: account.role === ROLE_STAFF;
  }
}
