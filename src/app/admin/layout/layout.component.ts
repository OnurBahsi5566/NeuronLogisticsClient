import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import {
  CustomToastrService,
  ToastrPosition,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private alertifyService: AlertifyService,
    private toastrService: CustomToastrService
  ) {}

  ngOnInit(): void {
    // this.alertifyService.message('Selam', {
    //   messageType: MessageType.Error,
    //   //delay: 5,
    //   //position: Position.BottomLeft,
    //   dissmissOthers: false,
    // });
    // this.toastrService.message('Selam', 'Onur', {
    //   messageType: TostrMessageType.Error,
    //   position: ToastrPosition.BottomLeft,
    // });
    // this.toastrService.message('Selam', 'Onur', {
    //   messageType: TostrMessageType.Info,
    //   position: ToastrPosition.BottomFullWidth,
    // });
  }
}
