import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CargoContainer } from 'src/app/contracts/definitions/cargo-container';
import { SelectCargoContainerDocumentsDialogComponent } from 'src/app/dialogs/select-cargo-container-documents-dialog/select-cargo-container-documents-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CargoContainerService } from 'src/app/services/admin/models/definitions/cargo-container.service';
import { DialogService } from 'src/app/services/common/dialog.service';

@Component({
  selector: 'app-cargo-container-list',
  templateUrl: './cargo-container-list.component.html',
  styleUrls: ['./cargo-container-list.component.scss'],
})
export class CargoContainerListComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    spinner: NgxSpinnerService,
    private cargoContainerService: CargoContainerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'teu',
    'createdDate',
    'document',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<CargoContainer> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    this.getCargoContainer();
  }

  async getCargoContainer() {
    this.showSpinner(SpinnerType.BallAtom);
    const cargoContainerList: {
      totalCount: number;
      cargoContainers: CargoContainer[];
    } = await this.cargoContainerService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.BallAtom),
      (errorMessgae) =>
        this.alertifyService.message(errorMessgae, {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        })
    );

    this.dataSource = new MatTableDataSource<CargoContainer>(
      cargoContainerList.cargoContainers
    );

    this.paginator.length = cargoContainerList.totalCount;
  }

  async pageChanged() {
    await this.getCargoContainer();
  }

  addDocuments(id: string) {
    this.dialogService.openDialog({
      componentType: SelectCargoContainerDocumentsDialogComponent,
      data: id,
      options: {
        width: '1400px',
      },
    });
  }
}
