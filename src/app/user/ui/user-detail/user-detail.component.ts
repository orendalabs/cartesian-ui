import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/core/ui';
import { User } from '@app/user/models';
import { UserSandbox } from '@app/user/user.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  userId: string;
  user;
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected _sandbox: UserSandbox,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchUserById(this.userId);
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.userId = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.user$.subscribe((user: User) => {
        this.user = user;
      })
    );
    this.subscriptions.push(
      this._sandbox.userLoading$.subscribe((loading) => {
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.userLoaded$.subscribe((loaded) => {
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.userFailed$.subscribe((failed) => {
        this.failed = failed;
      })
    );
  }

  deleteUser = (id: string) => {
    this.message.confirm(
      'Are you sure you want to delete the User with ID: ' + id,
      "Delete User",
      (confirmation) => {
        if (confirmation) {
          this._sandbox.deleteUserById(id);
        }
      }
    );
  };
}
