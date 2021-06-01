import { Injectable } from '@angular/core';
import { State } from '@app/app.store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthHttpService } from '../shared/auth-http.service';
import * as fromRoleActions from './role.action';
import * as fromPermissionActions from './permission.action';
import { ManageRoleForm } from '../models/manage/role.model';
import { CreateRoleForm } from '../models/create/role.model';
import { ManagePermissionForm } from '../models/manage/permission.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private roleHttpService: AuthHttpService,
    private store: Store<State>
  ) {}

  doAssignRole = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRoleActions.doAssignRole),
      map((action) => action.roleForm),
      switchMap((roleForm) =>
        this.roleHttpService.assignRole(ManageRoleForm.toJSON(roleForm)).pipe(
          map(() => fromRoleActions.doAssignRoleSuccess()),
          catchError((error) => of(fromRoleActions.doAssignRoleFail(error)))
        )
      )
    );
  });

  doRevokeRole = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRoleActions.doRevokeRole),
      map((action) => action.roleForm),
      switchMap((roleForm) =>
        this.roleHttpService.revokeRole(ManageRoleForm.toJSON(roleForm)).pipe(
          map(() => fromRoleActions.doRevokeRoleSuccess()),
          catchError((error) => of(fromRoleActions.doRevokeRoleFail(error)))
        )
      )
    );
  });

  doSyncRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doSyncRole),
      map((action) => action.roleForm),
      switchMap((roleForm) =>
        this.roleHttpService.syncRole(ManageRoleForm.toJSON(roleForm)).pipe(
          map(() => fromRoleActions.doSyncRoleSuccess()),
          catchError((error) => of(fromRoleActions.doSyncRoleFail(error)))
        )
      )
    )
  );

  doFetchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doFetchRoles),
      map((action) => action.requestCriteria),
      switchMap((criteria) =>
        this.roleHttpService.fetchRoles(criteria).pipe(
          map((results) =>
            fromRoleActions.doFetchRolesSuccess({ roles: results })
          ),
          catchError((error) => of(fromRoleActions.doFetchRolesFail(error)))
        )
      )
    )
  );

  doFetchRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doFetchRole),
      map((action) => Object.assign({}, { id: action.id, criteria: action.criteria })),
      switchMap((data) =>
        this.roleHttpService.fetchRoleById(data.id, data.criteria).pipe(
          map((result) =>
            fromRoleActions.doFetchRoleSuccess({ role: result.data })
          ),
          catchError((error) => of(fromRoleActions.doFetchRoleFail(error)))
        )
      )
    )
  );

  doCreateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doCreateRole),
      map((action) => action.form),
      switchMap((form) =>
        this.roleHttpService.createRole(CreateRoleForm.toJSON(form)).pipe(
          map((result) =>
            fromRoleActions.doCreateRoleSuccess({ role: result.data })
          ),
          catchError((error) => of(fromRoleActions.doCreateRoleFail(error)))
        )
      )
    )
  );

  doDeleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doDeleteRole),
      map((action) => action.id),
      switchMap((id) =>
        this.roleHttpService.deleteRoleById(id).pipe(
          map(() => fromRoleActions.doDeleteRoleSuccess()),
          catchError((error) => of(fromRoleActions.doDeleteRoleFail(error)))
        )
      )
    )
  );

  doAttachPermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPermissionActions.doAttachPermission),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.roleHttpService.attachPermission(ManagePermissionForm.toJSON(permForm)).pipe(
          map(() => fromPermissionActions.doAttachPermissionSuccess()),
          catchError((error) =>
            of(fromPermissionActions.doAttachPermissionFail(error))
          )
        )
      )
    );
  });

  doDetachPermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPermissionActions.doDetachPermission),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.roleHttpService.detachPermission(ManagePermissionForm.toJSON(permForm)).pipe(
          map(() => fromPermissionActions.doDetachPermissionSuccess()),
          catchError((error) =>
            of(fromPermissionActions.doDetachPermissionFail(error))
          )
        )
      )
    );
  });

  doSyncPermissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPermissionActions.doSyncPermissions),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.roleHttpService.syncPermissions(ManagePermissionForm.toJSON(permForm)).pipe(
          map(() => fromPermissionActions.doSyncPermissionsSuccess()),
          catchError((error) =>
            of(fromPermissionActions.doSyncPermissionsFail(error))
          )
        )
      )
    );
  });

  doFetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doFetchPermissions),
      map((action) => action.requestCriteria),
      switchMap((criteria) =>
        this.roleHttpService.fetchPermissions(criteria).pipe(
          map((results) =>
            fromPermissionActions.doFetchPermissionsSuccess({
              permissions: results,
            })
          ),
          catchError((error) =>
            of(fromPermissionActions.doFetchPermissionsFail(error))
          )
        )
      )
    )
  );

  doFetchPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doFetchPermission),
      map((action) => action.id),
      switchMap((id) =>
        this.roleHttpService.fetchPermission(id).pipe(
          map((result) =>
            fromPermissionActions.doFetchPermissionSuccess({
              permission: result.data,
            })
          ),
          catchError((error) =>
            of(fromPermissionActions.doFetchPermissionFail(error))
          )
        )
      )
    )
  );
}
