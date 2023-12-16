import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService
  ) {
    authService.identitiyCheck();
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logOut() {
    localStorage.removeItem('accessToken');
    this.authService.identitiyCheck();
    this.toastrService.message('Logged out', 'Log out!', {
      messageType: ToastrMessageType.Warning,
    });
  }
}
