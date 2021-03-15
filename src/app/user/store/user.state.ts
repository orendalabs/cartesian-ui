import { User } from '@app/user/models';
import {
  RoleDetailState,
  RoleListingState,
} from '@app/authorization/store/auth.state';

export interface UserListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<User>;
    meta: object;
  };
}

export interface UserDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: User | null;
}

export interface UserState {
  listing: UserListingState;
  detail: UserDetailState;
  roleListing: RoleListingState;
  roleDetail: RoleDetailState;
}
