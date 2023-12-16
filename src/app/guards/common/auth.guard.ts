import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AuthService,
  _isAuthenticated,
} from 'src/app/services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();

  if (!_isAuthenticated) {
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  } else {
    return true;
  }
};
