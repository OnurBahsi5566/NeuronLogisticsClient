import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCargoContainer } from 'src/app/contracts/definitions/create-cargo-container';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CargoContainerService } from 'src/app/services/admin/models/definitions/cargo-container.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-cargo-container-card',
  templateUrl: './cargo-container-card.component.html',
  styleUrls: ['./cargo-container-card.component.scss'],
})
export class CargoContainerCardComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    spinner: NgxSpinnerService,
    private cargoContainerService: CargoContainerService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  @Output() createdCargoContainer: EventEmitter<CreateCargoContainer> =
    new EventEmitter();

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'cargoContainers',
    explanation: 'Drag or select files...',
    //opsiyonel yazılabilir
    accept: '.png, .jpg, .jpeg, .json',
  };

  ngOnInit(): void {}

  create(txtName: HTMLInputElement, txtTeu: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createCargoContainer: CreateCargoContainer =
      new CreateCargoContainer();
    createCargoContainer.name = txtName.value;
    createCargoContainer.teu = parseFloat(txtTeu.value);

    this.cargoContainerService.create(
      createCargoContainer,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertifyService.message('Container added success.', {
          dissmissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
      },
      (errorMessage) => {
        this.alertifyService.message(errorMessage, {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
    this.createdCargoContainer.emit(createCargoContainer);
  }
}
