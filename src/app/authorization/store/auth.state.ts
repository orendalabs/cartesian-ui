import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';

export interface RoleDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Role | null;
}

export interface RoleListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Role>;
    meta: object;
  };
}

export interface PermissionDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Permission | null;
}

export interface PermissionListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Permission>;
    meta: object;
  };
}

export interface AuthorizationState {
  roleListing: RoleListingState;
  roleDetail: RoleDetailState;
  permissionListing: PermissionListingState;
  permissionDetail: PermissionDetailState;
}
