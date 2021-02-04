import { AccountState } from '@app/account/store';
import { UserState } from '@app/user/store';
import { AuthorizationState } from './authorization/store/auth.state';

export interface State {
  account: AccountState;
  user: UserState;
  authorization: AuthorizationState;
}
