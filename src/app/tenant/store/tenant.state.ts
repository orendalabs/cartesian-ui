import { Tenant } from '../models/domain';

export interface TenantListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Tenant>;
    meta: object;
  };
}

export interface TenantDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Tenant | null;
}

export interface TenantState {
  listing: TenantListingState;
  detail: TenantDetailState;
}
