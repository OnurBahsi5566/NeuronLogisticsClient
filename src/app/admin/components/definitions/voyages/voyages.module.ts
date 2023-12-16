import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoyagesComponent } from './voyages.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VoyagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VoyagesComponent }]),
  ],
})
export class VoyagesModule {}
