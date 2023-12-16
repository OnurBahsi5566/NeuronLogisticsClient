import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargoContainersComponent } from './cargo-containers.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CargoContainerListComponent } from './cargo-container-list/cargo-container-list.component';
import { CargoContainerCardComponent } from './cargo-container-card/cargo-container-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';

@NgModule({
  declarations: [
    CargoContainersComponent,
    CargoContainerListComponent,
    CargoContainerCardComponent,
    DeleteDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CargoContainersComponent }]),
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogsModule,
    FileUploadModule,
  ],
})
export class CargoContainersModule {}
