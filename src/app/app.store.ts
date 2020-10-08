import { AccountState } from '@app/account/store';
import { UserState } from '@app/user/store';

export interface State {
  account: AccountState;
  user: UserState;
}
