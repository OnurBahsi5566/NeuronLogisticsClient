import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from 'src/app/services/common/signal-r.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-urls';
import {
  CustomToastrService,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private signalRService: SignalRService,
    private toastrService: CustomToastrService
  ) {
    super(spinner);
    signalRService.start(HubUrls.CargoContainerHub);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.signalRService.on(
      ReceiveFunctions.CargoContainerAddedMessageReceiveFunction,
      (message) => {
        console.log('neden gelmedin');
        alert(message);
        this.toastrService.message(message, 'Real Time!', {
          messageType: ToastrMessageType.Info,
        });
      }
    );
  }

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
}
