import { TenantState } from './tenant.state';
import { TenantEffects } from './tenant.effect';
import { tenantFeatureKey, tenantReducers } from './tenant.reducer';
import * as tenantActions from './tenant.action';
import * as tenantSelectors from './tenant.selector';

export {
  TenantState,
  tenantActions,
  tenantFeatureKey,
  tenantReducers,
  tenantSelectors,
  TenantEffects,
};
