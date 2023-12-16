import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginResponse } from 'src/app/contracts/identity/app-user/login-response';
import { LoginRequest } from 'src/app/entities/identity/login-request';
import { HttpClientService } from '../../common/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  constructor(private httpClientService: HttpClientService) {}

  async login(user: LoginRequest, successCallBack?: () => void) {
    const observable: Observable<LoginResponse | LoginRequest> =
      this.httpClientService.post<LoginResponse | LoginRequest>(
        {
          controller: 'auth',
          action: 'login',
        },
        user
      );

    const loginResponse: LoginResponse = (await firstValueFrom(
      observable
    )) as LoginResponse;

    if (loginResponse) {
      localStorage.setItem('accessToken', loginResponse.token.accessToken);
      localStorage.setItem('refreshToken', loginResponse.token.refreshToken);
      successCallBack();
    }
  }

  async googleLogin(user: SocialUser, successCallBack?: () => void) {
    const observable: Observable<LoginResponse | SocialUser> =
      this.httpClientService.post<LoginResponse | SocialUser>(
        {
          controller: 'auth',
          action: 'googleLogin',
        },
        user
      );

    const loginResponse: LoginResponse = (await firstValueFrom(
      observable
    )) as LoginResponse;

    if (loginResponse) {
      localStorage.setItem('accessToken', loginResponse.token.accessToken);
      localStorage.setItem('refreshToken', loginResponse.token.refreshToken);
      successCallBack();
    }
  }

  async refrehTokenLogin(refreshToken: string, successCallBack?: () => void) {
    const observable: Observable<any | LoginResponse> =
      this.httpClientService.post(
        {
          action: 'refreshTokenLogin',
          controller: 'auth',
        },
        { refreshToken: refreshToken }
      );

    const loginResponse: LoginResponse = (await firstValueFrom(
      observable
    )) as LoginResponse;

    if (loginResponse) {
      localStorage.setItem('accessToken', loginResponse.token.accessToken);
      localStorage.setItem('refreshToken', loginResponse.token.refreshToken);
      successCallBack();
    }
  }
}
