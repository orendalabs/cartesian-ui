import { Action, createReducer, on } from "@ngrx/store";
import * as permissionActions from './permission.action'
import { PermissionListingState } from "./auth.state";

const INITIAL_STATE: PermissionListingState = {
    loading: false,
    loaded: false,
    failed: false,
    data: {
        data: [],
        meta: null
    },
};

const createPermissionReducers = createReducer(
    INITIAL_STATE,
    on(permissionActions.doFetchPermissions,
        (state) => Object.assign({}, state, {
            loading: true,
            loaded: false,
            failed: false,
        })
    ),
    on(permissionActions.doFetchPermissionsSuccess,
        (state, { permissions }) => Object.assign({}, state, {
            loading: false,
            loaded: true,
            failed: false,
            data: permissions
        })
    ),
    on(permissionActions.doFetchPermissionsFail,
        (state) => Object.assign({}, INITIAL_STATE, {
            failed: true
        })
    )
)


export const reducer = (state: PermissionListingState | undefined, action: Action) => {
    return createPermissionReducers(state, action);
}
