import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { RegisterResponse } from 'src/app/contracts/identity/app-user/register-response';
import { RegisterRequest } from 'src/app/entities/identity/register-request';
import { AppUserService } from 'src/app/services/ui/identity/app-user.service';
import {
  CustomToastrService,
  ToastrPosition,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private appUserService: AppUserService,
    private toastrService: CustomToastrService
  ) {
    super(spinner);
  }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });
  }

  async onSubmit(user: RegisterRequest) {
    const result: RegisterResponse = await this.appUserService.register(user);

    result.succeeded
      ? this.toastrService.message(result.message, 'Success!', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        })
      : this.toastrService.message(result.message, 'Error!', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
  }
}
