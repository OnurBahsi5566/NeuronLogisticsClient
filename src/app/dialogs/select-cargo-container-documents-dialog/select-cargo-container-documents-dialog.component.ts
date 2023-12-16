import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { CargoContainerService } from 'src/app/services/admin/models/definitions/cargo-container.service';
import { CargoContainerFile } from 'src/app/contracts/definitions/cargo-container-file';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  DeleteDialogComponent,
  DeleteDialogState,
} from '../delete-dialog/delete-dialog.component';
import {
  CustomToastrService,
  ToastrPosition,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-select-cargo-container-documents-dialog',
  templateUrl: './select-cargo-container-documents-dialog.component.html',
  styleUrls: ['./select-cargo-container-documents-dialog.component.scss'],
})
export class SelectCargoContainerDocumentsDialogComponent
  extends BaseDialog<SelectCargoContainerDocumentsDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectCargoContainerDocumentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: SelectCargoContainerDialogState | string,
    private cargoContainerService: CargoContainerService,
    private dialogService: DialogService,
    private myToastrService: CustomToastrService
  ) {
    super(dialogRef);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png,.jpg,.jpeg,.pdf,.txt,.gif',
    action: 'upload',
    controller: 'cargoContainers',
    explanation: 'Drag or select files... ',
    queryString: `id=${this.data}`,
  };

  files: CargoContainerFile[];

  async ngOnInit() {
    this.files = await this.cargoContainerService.readFiles(
      this.data as string
    );
    console.log(this.files);
  }

  async deleteDocument(documentId: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteDialogState.Yes,
      afterClosed: async () => {
        await this.cargoContainerService
          .deleteDocument(this.data as string, documentId)
          .then(
            (data) => {
              this.myToastrService.message('Success', 'File Delete', {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              });
            },
            (errorResponse: HttpErrorResponse) => {
              this.myToastrService.message('Error', 'File Delete', {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight,
              });
            }
          );
      },
    });
  }
}

export enum SelectCargoContainerDialogState {
  Close,
}
