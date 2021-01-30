import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditUserForm } from '@app/user/models/form/edit-user.model';
import { UserSandbox } from '@app/user/user.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  subscriptions: Array<Subscription> = []
  userId: string;

  constructor(protected _sandbox: UserSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.userId = params.id;
      })
    )
  }

  update() {
    if (this.formGroup.valid) {
      const form = new EditUserForm({
        name: this.formGroup.controls['name'].value,
        password: this.formGroup.controls['password'].value
      });
      this._sandbox.updateUser(this.userId, form);
    }
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    if (control.valid) {
      return 'is-valid'
    } else if (control.dirty && control.touched) {
      return 'is-invalid'
    }
  }
}
