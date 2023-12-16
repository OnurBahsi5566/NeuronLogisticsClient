import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { LoginRequest } from 'src/app/entities/identity/login-request';
import { AuthService } from 'src/app/services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';
import { LoginAuthService } from 'src/app/services/ui/identity/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private loginAuthService: LoginAuthService,
    private router: Router,
    private toastrService: CustomToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      switch (user.provider) {
        case 'GOOGLE':
          await this.loginAuthService.googleLogin(user, () => {
            this.toastrService.message(
              'User from Google login successful.',
              'Login!',
              {
                messageType: ToastrMessageType.Success,
              }
            );

            this.authService.identitiyCheck();

            this.activatedRoute.queryParams.subscribe((params) => {
              const returnUrl: string = params['returnUrl'];
              returnUrl
                ? this.router.navigate([returnUrl])
                : this.router.navigate(['/admin']);
            });
          });
          break;

        default:
          break;
      }
    });
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.loginForm = this.formBuilder.group({
      userNameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.checkReturnUrl();
  }

  checkReturnUrl() {
    if (this.router.url.includes('returnUrl')) {
      this.toastrService.message('Please log in.', 'Log in!', {
        messageType: ToastrMessageType.Warning,
      });
    }
  }

  async onSubmit(user: LoginRequest) {
    await this.loginAuthService.login(user, () => {
      this.toastrService.message('User login successful.', 'Login!', {
        messageType: ToastrMessageType.Success,
      });

      this.authService.identitiyCheck();

      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        returnUrl
          ? this.router.navigate([returnUrl])
          : this.router.navigate(['/admin']);
      });
    });
  }
}
