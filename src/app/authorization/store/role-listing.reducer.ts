import { Action, createReducer, on } from "@ngrx/store";
import * as roleActions from './role.action'
import { RoleListingState } from "./auth.state";

const INITIAL_STATE: RoleListingState = {
    loading: false,
    loaded: false,
    failed: false,
    data: {
        data: [],
        meta: null
    },
};

const createRoleReducers = createReducer(
    INITIAL_STATE,
    on(roleActions.doFetchRoles,
        (state) => Object.assign({}, state, {
            loading: true,
            loaded: false,
            failed: false,
        })
    ),
    on(roleActions.doFetchRolesSuccess,
        (state, { roles }) => Object.assign({}, state, {
            loading: false,
            loaded: true,
            failed: false,
            data: roles
        })
    ),
    on(roleActions.doFetchRolesFail,
        (state) => Object.assign({}, INITIAL_STATE, {
            failed: true
        })
    )
)


export const reducer = (state: RoleListingState | undefined, action: Action) => {
    return createRoleReducers(state, action);
}
