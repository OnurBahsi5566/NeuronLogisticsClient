import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  DeleteDialogComponent,
  DeleteDialogState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement('img');
    //burada src kısımları dosya çıkışına göre değişebilir dosyalardan erişirken buraya bakılacak.
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor: pointer;');
    img.width = 20;
    img.height = 20;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Input() formName: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteDialogState.Yes,
      afterClosed: async () => {
        //this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        //await this.cargoContainerService.delete(this.id);
        this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe(
            (data) => {
              $(td.parentElement).animate(
                {
                  opacity: 0,
                  left: '+=50',
                  height: 'toogle',
                },
                1000,
                () => {
                  this.callback.emit();
                  this.alertifyService.message(
                    this.formName + ' Delete was success.',
                    {
                      dissmissOthers: true,
                      messageType: MessageType.Success,
                      position: Position.TopRight,
                    }
                  );
                }
              );
            },
            (errorResponse: HttpErrorResponse) => {
              this.alertifyService.message(
                this.formName + ' Delete was error.',
                {
                  dissmissOthers: true,
                  messageType: MessageType.Error,
                  position: Position.TopRight,
                }
              );
            }
          );
      },
    });
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}
