import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import {
  CustomToastrService,
  ToastrPosition,
  ToastrMessageType,
} from '../../ui/custom-toastr.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private myToastrService: CustomToastrService,
    private dialogService: DialogService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              this.myToastrService.message('Success', 'File Upload', {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              });
            },
            (errorResponse: HttpErrorResponse) => {
              this.myToastrService.message('Error', 'File Upload', {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight,
              });
            }
          );
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}
