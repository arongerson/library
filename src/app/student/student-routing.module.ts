import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AccountComponent } from './components/account/account.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

const userRoutes: Routes = [
  {
    path: 'student',
    component: MainNavComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: AccountComponent },
      { path: 'account', component: AccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
