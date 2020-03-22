import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService) { }

  canLoad(
    route: Route,
    segments: UrlSegment[])
      : boolean | Promise<boolean> | Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        debugger;
        if (!loggedIn) {
          this.auth.login();
        }
      })
    );
  }
}
