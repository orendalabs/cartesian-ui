import { Injectable } from '@angular/core';
import { PermissionCheckerService } from '@cartesian-ui/ng-axis';
import { SessionService } from './session.service';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private _permissionChecker: PermissionCheckerService,
    private _router: Router,
    private _sessionService: SessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this._sessionService.user) {
      this._router.navigate(['/account/login']);
      return false;
    }

    if (!route.data || !route.data.permission) {
      return true;
    }

    if (this._permissionChecker.isGranted(route.data.permission)) {
      return true;
    }

    this._router.navigate([this.selectBestRoute()]);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    if (!this._sessionService.user) {
      return '/account/login';
    }

    if (this._permissionChecker.isGranted('Pages.Users')) {
      return '/app/admin/users';
    }

    return '/app/home';
  }

  checkLogin(url: string): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return true;
    }

    // Navigate to the login page with extras
    this._router.navigate(['/login']);
    return false;
  }
}
