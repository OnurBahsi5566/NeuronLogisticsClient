import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { CargoContainer } from 'src/app/contracts/definitions/cargo-container';
import { CargoContainerFile } from 'src/app/contracts/definitions/cargo-container-file';
import { CreateCargoContainer } from 'src/app/contracts/definitions/create-cargo-container';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CargoContainerService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    cargoContainer: CreateCargoContainer,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'cargoContainers',
        },
        cargoContainer
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; cargoContainers: CargoContainer[] }> {
    const promiseData: Promise<{
      totalCount: number;
      cargoContainers: CargoContainer[];
    }> = this.httpClientService
      .get<{ totalCount: number; cargoContainers: CargoContainer[] }>({
        controller: 'cargoContainers',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'cargoContainers',
        },
        id
      );

    await firstValueFrom(deleteObservable);
  }

  async readFiles(id: string): Promise<CargoContainerFile[]> {
    const getObservable: Observable<CargoContainerFile[]> =
      this.httpClientService.get<CargoContainerFile[]>(
        {
          action: 'getFiles',
          controller: 'cargoContainers',
        },
        id
      );

    return await firstValueFrom(getObservable);
  }

  async deleteDocument(id: string, cargoContainerFileId: string) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteDocument',
        controller: 'cargoContainers',
        queryString: `CargoContainerFileId=${cargoContainerFileId}`,
      },
      id
    );

    await firstValueFrom(deleteObservable);
  }
}
