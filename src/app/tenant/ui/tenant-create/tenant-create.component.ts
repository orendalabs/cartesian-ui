import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/ui';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { TenantCreateForm } from '@app/tenant/models/form';
import { TenantSandbox } from '@app/tenant/tenant.sandbox';

@Component({
  selector: 'tenant-create',
  templateUrl: './tenant-create.component.html',
})
export class TenantCreateComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  loading: boolean;
  loaded: boolean;
  failed: boolean;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      validation: [Validators.required],
      invalidMessage: 'Please enter a name',
    },
    {
      label: 'Create',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];

  constructor(injector: Injector, private _sandbox: TenantSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.tenantLoading$.subscribe((loading) => {
        if (loading && this.loading !== undefined) {
          this.notify.info('Creating tenant');
          this.config[1].disabled = true;
        }
        this.loading = loading;
      }),
      this._sandbox.tenantLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded !== undefined) {
          this.notify.success('Tenant created', 'Success!');
          this.config[1].disabled = false;
        }
        this.loaded = loaded;
      }),
      this._sandbox.tenantFailed$.subscribe((failed) => {
        if (failed && this.failed !== undefined) {
          this.config[1].disabled = false;
        }
        this.failed = failed;
      })
    );
  }

  create(group): void {
    if (this.loading) {
      this.notify.warn('Please wait for the previous request', 'Warning!');
    } else if (group.valid) {
      const form = new TenantCreateForm({ name: group.controls.name.value });
      this._sandbox.createTenant(form);
    } else {
      this.notify.warn('Invalid form data', 'Warning!');
    }
  }
}
