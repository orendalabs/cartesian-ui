import { Store, select }    from '@ngrx/store';
import { localeDateString } from '@cartesian-ui/ng-axis';
import { AuthToken, User }  from '@shared/models';
import {
  State,
  getLoggedUser,
  getAuthenticated,
  getSelectedCulture
}                           from '@app/app.store';
import { actions as authActions }  from '@app/account';


export abstract class Sandbox {

  public loggedUser$      = this.store.pipe(select(getLoggedUser));
  public isAuthenticated$ = this.store.pipe(select(getAuthenticated));
  public culture$         = this.store.pipe(select(getSelectedCulture));
  public culture:     string;

  constructor(protected store: Store<State>) {}

  /**
   * Pulls user from local storage and saves it to the store
   */
  public loadLoggedUser(): void {
    var user = JSON.parse(localStorage.getItem('loggedUser'));
    this.store.dispatch(authActions.addUserAction({ user: new User(user)}));
  }

  /**
   * Pulls token from local storage and saves it to the store
   */
  public loadAuthToken(): void {
    var token = JSON.parse(localStorage.getItem('authToken'));
    this.store.dispatch(authActions.addAuthTokenAction( { authToken: new AuthToken(token)}));
  }

  /**
   * Formats date string based on selected culture
   *
   * @param value
   */
  public formatDate(value: string) {
    return localeDateString(value, this.culture);
  }
}
