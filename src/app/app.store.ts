import { AccountState } from '@app/account/store';
import { UserState } from '@app/user/store';
import { SettingState } from './settings/store/setting.state';

export interface State {
  account: AccountState;
  user: UserState;
  setting: SettingState;
}
