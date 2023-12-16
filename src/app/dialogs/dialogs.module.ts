import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { SelectCargoContainerDocumentsDialogComponent } from './select-cargo-container-documents-dialog/select-cargo-container-documents-dialog.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectCargoContainerDocumentsDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule,
  ],
})
export class DialogsModule {}
