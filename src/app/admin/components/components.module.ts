import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargoContainersModule } from './definitions/cargo-containers/cargo-containers.module';
import { VesselsModule } from './definitions/vessels/vessels.module';
import { VoyagesModule } from './definitions/voyages/voyages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CargoContainersModule, VesselsModule, VoyagesModule],
})
export class ComponentsModule {}
