import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCargoContainer } from 'src/app/contracts/definitions/create-cargo-container';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { CargoContainerListComponent } from './cargo-container-list/cargo-container-list.component';

@Component({
  selector: 'app-cargo-containers',
  templateUrl: './cargo-containers.component.html',
  styleUrls: ['./cargo-containers.component.scss'],
})
export class CargoContainersComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  @ViewChild(CargoContainerListComponent)
  listCargoContainer: CargoContainerListComponent;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
  }

  createdCargoContainer(createdCargoContainer: CreateCargoContainer) {
    this.listCargoContainer.getCargoContainer();
  }
}
