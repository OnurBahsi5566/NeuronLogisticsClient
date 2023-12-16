import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { RegisterRequest } from 'src/app/entities/identity/register-request';
import { RegisterResponse } from 'src/app/contracts/identity/app-user/register-response';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  constructor(private httpClientService: HttpClientService) {}

  async register(user: RegisterRequest): Promise<RegisterResponse> {
    const observable: Observable<RegisterResponse | RegisterRequest> =
      this.httpClientService.post<RegisterResponse | RegisterRequest>(
        {
          controller: 'users',
          action: 'register',
        },
        user
      );

    return (await firstValueFrom(observable)) as RegisterResponse;
  }
}
