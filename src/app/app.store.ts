import { AccountState } from '@app/account/store';
import { UserState } from '@app/user/store';
import { AuthorizationState } from './authorization/store/auth.state';
import { LocationState } from '@app/location/store/location.state';

export interface State {
  account: AccountState;
  user: UserState;
  authorization: AuthorizationState;
  location: LocationState;
}
